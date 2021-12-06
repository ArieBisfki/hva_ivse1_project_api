import {container} from "tsyringe";
import {
    LoginUserRequestHandler,
    RegisterUserRequestHandler
} from "../models/endpoint/auth";
import {DI_TOKEN} from "../di/Registry";
import {constants} from "http2";
import {resultIsFail} from "../utils/FailOrSuccess";

const userRepository = container.resolve(DI_TOKEN.UserRepository);
const authTokenService = container.resolve(DI_TOKEN.AuthTokenService);

/*const getUser: GetUserRequestHandler = async (req, res, next) => {
    let id = req.params.id;

    const user = users.Arie;
    console.log("testtses:   " + req.params);

    return res.status(200).json({
        message: user
    });
};*/

const loginUser: LoginUserRequestHandler = async (req, res, next) => {
    const user = await userRepository.getByUsername(req.body.username);

    if (!user) {
        return res.status(constants.HTTP_STATUS_NOT_FOUND).send();
    }

    if (req.body.password !== user.password) {
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send();
    }

    const accessToken = await authTokenService.generateAccessToken(user.id!);
    if (!accessToken) {
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }

    const refreshToken = await authTokenService.generateRefreshToken(user.id!);
    if (!refreshToken) {
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }

    res.status(constants.HTTP_STATUS_OK).json({
        accessToken,
        refreshToken
    }).send();
}

const registerUser: RegisterUserRequestHandler = async (req, res, next) => {

    const existingUserWithUsername = await userRepository.getByUsername(req.body.username);

    if (existingUserWithUsername) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    } else {
        const createUserResult = await userRepository.create(req.body);
        if (resultIsFail(createUserResult)) {
            return res.status(constants.HTTP_STATUS_BAD_REQUEST).send();
        } else {
            return res.status(constants.HTTP_STATUS_OK).send();
        }
    }
}

export default {loginUser, registerUser};

