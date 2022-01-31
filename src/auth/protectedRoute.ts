import {RequestHandler, Response} from "express/ts4.0";
import {constants} from "http2";
import {container} from "tsyringe";
import {DI_TOKEN} from "../di/Registry";
import AbstractAuthTokenService from "./AbstractAuthTokenService";
import {resultIsFail} from "../utils/FailOrSuccess";
import {extractAuthToken} from "../utils/AuthUtils";

function sendUnauthorized(res: Response<any, any>): void {
    res.status(constants.HTTP_STATUS_UNAUTHORIZED)
        .send();
}

const authTokenService = container.resolve(DI_TOKEN.AuthTokenService);

/**
 * Feature was implemented in this nested function structure
 * because chaining request handlers at the express route definition requires
 * all of the chained request handlers to have the same Typescript generic typings, which is a colossal constraint.
 * @param actualRequestHandler
 */
export default function protectedRoute(actualRequestHandler: RequestHandler<any, any, any, any, any>): RequestHandler {
    return async (req, res, next) => {
        const token = extractAuthToken(req);
        if (!token) {
            return sendUnauthorized(res);
        }

        const wasVerified = await authTokenService.verifyAndExtractPayload(token, AbstractAuthTokenService.TokenType.ACCESS_TOKEN);
        if (resultIsFail(wasVerified)) {
            return sendUnauthorized(res);
        }

        actualRequestHandler(req, res, next);
    };
}
