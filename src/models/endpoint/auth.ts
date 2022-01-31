import {RequestHandler} from "express";
import User from "../User";
import {Request} from "express/ts4.0";

// Login user
export type LoginUserRequestHandler = RequestHandler<
    LoginUserRouteParams,
    LoginUserResBody,
    LoginUserPasswordReqBody | LoginUserRefreshTokenReqBody,
    LoginUserQueryParams
    >;
export type LoginUserRouteParams = undefined;
export type LoginUserResBody = typeof loginUserResBody;
export type LoginUserQueryParams = undefined;
export type LoginUserPasswordReqBody = {username: string, password: string};
export type LoginUserRefreshTokenReqBody = {refreshToken: string};
const refreshTokenKey = "refreshToken" as const;
const loginUserResBody = {accessToken: "", [refreshTokenKey]: ""};
export function loginUserReqBodyIsPassword(
    reqBody: LoginUserPasswordReqBody | LoginUserRefreshTokenReqBody
): reqBody is LoginUserPasswordReqBody {
    return (reqBody as any)[refreshTokenKey] == null;
}

// Register user
export type RegisterUserRequestHandler = RequestHandler<RegisterUserRouteParams, RegisterUserResBody, RegisterUserReqBody, RegisterUserQueryParams>;
export type RegisterUserRouteParams = undefined;
export type RegisterUserReqBody = User;
export type RegisterUserResBody = {token: string};
export type RegisterUserQueryParams = undefined;
