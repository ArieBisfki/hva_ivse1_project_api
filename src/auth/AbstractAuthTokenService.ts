import {JwtPayload, Secret, SignOptions} from "jsonwebtoken";
import {exec, Result, resultIsFail} from "../utils/FailOrSuccess";
import {container} from "tsyringe";
import {DI_TOKEN} from "../di/Registry";
import User from "../models/User";

export type Payload = {
    userId: number
};

export function jwtPayloadIsPayload(arg: JwtPayload): arg is Payload {
    return arg.hasOwnProperty("userId");
}

export type TokenType = InstanceType<(typeof AbstractAuthTokenService)["TokenType"]>;
export type AuthTokenServiceError = typeof AbstractAuthTokenService.Error;
type E = AuthTokenServiceError;

export default abstract class AbstractAuthTokenService {

    static Error = Object.freeze({
        VALIDATION: 0,
        INVALID_PAYLOAD: 1,
        REFRESH_TOKEN_REVOCATION: 2,
        GENERATION: 3,
        DATABASE_ERROR: 4,
        INVALID_REFRESH_TOKEN: 5
    } as const);

    static TokenType = class {
        static ACCESS_TOKEN = new (this)({
            expiresIn: "1h",
            secret: () => process.env.ACCESS_TOKEN_SECRET!
        });

        static REFRESH_TOKEN = new (this)({
            expiresIn: "1h",
            secret: () => process.env.REFRESH_TOKEN_SECRET!
        });

        readonly expiresIn: SignOptions["expiresIn"];
        /**
         * Function type instead of simple value type because the env variables may not be declared yet
         * by the time this field is assigned.
         */
        readonly secret: () => Secret;

        constructor({expiresIn, secret}: {
            expiresIn: SignOptions["expiresIn"]
            secret: () => Secret
        }) {
            this.expiresIn = expiresIn;
            this.secret = secret;
        }
    }

    protected readonly userRefreshTokenRepository = container.resolve(DI_TOKEN.UserRefreshTokenRepository);

    protected generatePayload(userId: number): Payload {
        return {
            userId
        };
    }

    generateAccessTokenByRefreshToken(refreshToken: string): Promise<Result<{payload: Payload, accessToken: string}, E[keyof E]>> {
        const E = AbstractAuthTokenService.Error; // alias
        return exec(async (resolve, err) => {
            const verifyAndExtractResult = await this.verifyAndExtractPayload(refreshToken, AbstractAuthTokenService.TokenType.REFRESH_TOKEN);
            if (resultIsFail(verifyAndExtractResult)) {
                return err(verifyAndExtractResult.error);
            }

            const payload = verifyAndExtractResult.result;
            const refreshTokenInRepo = await this.userRefreshTokenRepository.getRefreshTokenByUserId(payload.userId);
            if (!refreshTokenInRepo) {
                return err(E.DATABASE_ERROR);
            }

            if (refreshToken !== refreshTokenInRepo) {
                return err(E.INVALID_REFRESH_TOKEN);
            }

            const accessToken = await this.generateToken(payload.userId, AbstractAuthTokenService.TokenType.ACCESS_TOKEN);
            if (accessToken == undefined) {
                return err(E.GENERATION);
            }

            resolve({
                payload,
                accessToken
            });
        });
    }

    generateAccessTokenByUserId(userId: number): Promise<string | undefined> {
        return this.generateToken(userId, AbstractAuthTokenService.TokenType.ACCESS_TOKEN);
    }

    async generateRefreshToken(user: number | User): Promise<string | undefined> {
        const userId = typeof user === "number"
            ? user
            : user.id;

        if (!userId) {
            return;
        }

        const newlyGeneratedRefreshToken = await this.generateToken(userId, AbstractAuthTokenService.TokenType.REFRESH_TOKEN);
        if (!newlyGeneratedRefreshToken) {
            return;
        }

        const updateRefreshTokenResult = await this.userRefreshTokenRepository.updateRefreshTokenForUser(user, newlyGeneratedRefreshToken);
        if (resultIsFail(updateRefreshTokenResult)) {
            return;
        }

        return newlyGeneratedRefreshToken;
    }

    protected abstract generateToken(userId: number, tokenType: TokenType): Promise<string | undefined>;

    protected abstract verifyAndExtractPayload(token: string, tokenType: TokenType): Promise<Result<Payload, E["VALIDATION"] | E["INVALID_PAYLOAD"]>>;
}