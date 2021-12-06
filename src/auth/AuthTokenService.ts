import jwt from "jsonwebtoken";
import AbstractAuthTokenService, {Payload, TokenType} from "./AbstractAuthTokenService";

export class AuthTokenService extends AbstractAuthTokenService {

    generateToken(userId: number, tokenType: TokenType): Promise<string | undefined> {
        return new Promise(resolve => {
            jwt.sign(this.generatePayload(userId), tokenType.secret(), {
                expiresIn: tokenType.expiresIn
            }, (err, token) => {
                console.log({err});
                const toResolve = err == null && token != null
                    ? token
                    : undefined;
                resolve(toResolve);
            });
        });
    }

    verifyAndExtractPayload(token: string, tokenType: TokenType): Promise<Payload | undefined> {
        return new Promise(resolve => {
            jwt.verify(token, tokenType.secret(), {
                maxAge: tokenType.expiresIn
            }, (verifyErrors, decoded) => {
                console.log({verifyErrors});
                const toResolve = !verifyErrors
                    ? decoded as Payload
                    : undefined;
                resolve(toResolve);
            })
        });
    }
}