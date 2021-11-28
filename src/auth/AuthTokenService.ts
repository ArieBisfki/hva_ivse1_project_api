import jwt from "jsonwebtoken";
import env from "../utils/env";
import * as FailOrSuccess from "../utils/FailOrSuccess";
import AbstractAuthTokenService, {Payload} from "./AbstractAuthTokenService";

export class AuthTokenService extends AbstractAuthTokenService {
    private static readonly EXPIRES_IN = "1h";

    generateToken(userId: number): string {
        return jwt.sign(this.generatePayload(userId), env("AUTH_SECRET"), {
            expiresIn: AuthTokenService.EXPIRES_IN
        });
    }

    extractPayload(token: string): Promise<FailOrSuccess.Result<Payload, void>> {
        return FailOrSuccess.exec((resolve, err) => {
            jwt.verify(token, env("AUTH_SECRET"), {
                maxAge: AuthTokenService.EXPIRES_IN
            }, (verifyErrors, decoded) => {
                if (!verifyErrors) {
                    resolve(decoded as Payload);
                } else {
                    err();
                }
            })
        });
    }
}