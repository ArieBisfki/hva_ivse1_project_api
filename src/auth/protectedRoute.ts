import {ProtectedRouteRequestHandler} from "../models/endpoint/auth";
import {RequestHandler, Response} from "express/ts4.0";
import {constants} from "http2";
import {container} from "tsyringe";
import {DI_TOKEN} from "../di/Registry";
import AbstractAuthTokenService from "./AbstractAuthTokenService";

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
export default function protectedRoute(actualRequestHandler: RequestHandler<any, any, any, any, any>): ProtectedRouteRequestHandler {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader == null) {
            return sendUnauthorized(res);
        }

        const parts = authHeader.split("Bearer ");
        if (parts.length !== 2) {
            return sendUnauthorized(res);
        }

        const token = parts[1]!;

        const wasVerified = !!(await authTokenService.verifyAndExtractPayload(token, AbstractAuthTokenService.TokenType.ACCESS_TOKEN));
        if (!wasVerified) {
            return sendUnauthorized(res);
        }

        actualRequestHandler(req, res, next);
    };
}