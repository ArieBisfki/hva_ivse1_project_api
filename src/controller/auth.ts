import {container} from "tsyringe";
import {
    LoginUserPasswordReqBody, LoginUserRefreshTokenReqBody, loginUserReqBodyIsPassword,
    LoginUserRequestHandler, LoginUserResBody,
    RegisterUserRequestHandler
} from "../models/endpoint/auth";
import {DI_TOKEN} from "../di/Registry";
import {constants} from "http2";
import * as FailOrSuccess from "../utils/FailOrSuccess";
import {resultIsFail} from "../utils/FailOrSuccess";

const userRepository = container.resolve(DI_TOKEN.UserRepository);
const authTokenService = container.resolve(DI_TOKEN.AuthTokenService);

function loginByPassword({username, password}: LoginUserPasswordReqBody): Promise<FailOrSuccess.Result<LoginUserResBody, {
    statusCode: number
}>> {
    return FailOrSuccess.exec(async (resolve, err) => {
        const user = await userRepository.getByUsername(username);

        if (!user) {
            return err({statusCode: constants.HTTP_STATUS_BAD_REQUEST});
        }

        if (password !== user.password) {
            return err({statusCode: constants.HTTP_STATUS_UNAUTHORIZED});
        }

        const accessToken = await authTokenService.generateAccessTokenByUserId(user.id!);
        if (!accessToken) {
            return err({statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});
        }

        const refreshToken = await authTokenService.generateRefreshToken(user.id!);
        if (!refreshToken) {
            return err({statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});
        }

        resolve({
            accessToken,
            refreshToken
        });
    });
}

function loginByRefreshToken({refreshToken}: LoginUserRefreshTokenReqBody): Promise<FailOrSuccess.Result<LoginUserResBody, {
    statusCode: number
}>> {
    return FailOrSuccess.exec(async (resolve, err) => {
        const accessTokenResult = await authTokenService.generateAccessTokenByRefreshToken(refreshToken);
        if (resultIsFail(accessTokenResult)) {
            return err({statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});
        }

        const newRefreshToken = await authTokenService.generateRefreshToken(accessTokenResult.result.payload.userId);
        if (!newRefreshToken) {
            return err({statusCode: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR});
        }

        resolve({
            accessToken: accessTokenResult.result.accessToken,
            refreshToken: newRefreshToken
        });
    });
}

const loginUser: LoginUserRequestHandler = async (req, res, next) => {
    const resBodyResult = loginUserReqBodyIsPassword(req.body)
        ? await loginByPassword(req.body)
        : await loginByRefreshToken(req.body);

    if (FailOrSuccess.resultIsFail(resBodyResult)) {
        return res.status(resBodyResult.error.statusCode)
            .send();
    } else {
        return res.status(constants.HTTP_STATUS_OK)
            .json(resBodyResult.result)
            .send();
    }
}

const registerUser: RegisterUserRequestHandler = async (req, res, next) => {

    const existingUserWithUsername = await userRepository.getByUsername(req.body.username);

    if (existingUserWithUsername) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    } else {
        const createUserResult = await userRepository.create(req.body);
        if (FailOrSuccess.resultIsFail(createUserResult)) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST).send();
        } else {
            return res.status(constants.HTTP_STATUS_OK).send();
        }
    }
}

export default {loginUser, registerUser};

