import {Secret, SignOptions} from "jsonwebtoken";

export type Payload = {
    userId: number
};

export type TokenType = InstanceType<(typeof AbstractAuthTokenService)["TokenType"]>;

export default abstract class AbstractAuthTokenService {

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

    protected generatePayload(userId: number): Payload {
        return {
            userId
        };
    }

    async generateAccessTokenByRefreshToken(refreshToken: string): Promise<string | undefined> {
        const payload = await this.verifyAndExtractPayload(refreshToken, AbstractAuthTokenService.TokenType.REFRESH_TOKEN);
        if (!payload) {
            return;
        }

        return this.generateToken(payload.userId, AbstractAuthTokenService.TokenType.ACCESS_TOKEN);
    }

    generateAccessToken(userId: number): Promise<string | undefined> {
        return this.generateToken(userId, AbstractAuthTokenService.TokenType.ACCESS_TOKEN);
    }

    generateRefreshToken(userId: number): Promise<string | undefined> {
        return this.generateToken(userId, AbstractAuthTokenService.TokenType.REFRESH_TOKEN);
    }

    protected abstract generateToken(userId: number, tokenType: TokenType): Promise<string | undefined>;

    abstract verifyAndExtractPayload(token: string, tokenType: TokenType): Promise<Payload | undefined>;
}