import jwt from "jsonwebtoken";
import AbstractAuthTokenService, {
    AuthTokenServiceError,
    jwtPayloadIsPayload,
    Payload,
    TokenType
} from "./AbstractAuthTokenService";
import {exec, Result} from "../utils/FailOrSuccess";

type E = AuthTokenServiceError;

export class AuthTokenService extends AbstractAuthTokenService {
    generateToken(userId: number, tokenType: TokenType): Promise<string | undefined> {
        return new Promise(resolve => {
            jwt.sign(this.generatePayload(userId), tokenType.secret(), {
                expiresIn: tokenType.expiresIn
            }, (err, token) => {
                const toResolve = err == null && token != null
                    ? token
                    : undefined;
                resolve(toResolve);
            });
        });
    }

    verifyAndExtractPayload(token: string, tokenType: TokenType): Promise<Result<Payload, E["VALIDATION"] | E["INVALID_PAYLOAD"]>> {
        const E = AbstractAuthTokenService.Error;
        return exec((resolve, err) => {
            jwt.verify(token, tokenType.secret(), {
                maxAge: tokenType.expiresIn
            }, async (verifyErrors, decoded) => {
                if (verifyErrors) {
                    return err(E.VALIDATION);
                }

                if (!decoded || !jwtPayloadIsPayload(decoded)) {
                    return err(E.INVALID_PAYLOAD);
                }

                resolve(decoded);
            })
        });
    }
}
