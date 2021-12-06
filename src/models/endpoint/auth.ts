import {RequestHandler} from "express";
import User from "../User";

export type ProtectedRouteRequestHandler = RequestHandler<ProtectedRouteRouteParams, ProtectedRouteResBody, ProtectedRouteReqBody, ProtectedRouteQueryParams>;
export type ProtectedRouteRouteParams = undefined;
export type ProtectedRouteReqBody = undefined;
export type ProtectedRouteResBody = undefined;
export type ProtectedRouteQueryParams = undefined;

// Login user
export type LoginUserRequestHandler = RequestHandler<LoginUserRouteParams, LoginUserResBody, LoginUserReqBody, LoginUserQueryParams>;
export type LoginUserRouteParams = undefined;
export type LoginUserReqBody = {username: string, password: string};
export type LoginUserResBody = {accessToken: string, refreshToken: string};
export type LoginUserQueryParams = undefined;

// Register user
export type RegisterUserRequestHandler = RequestHandler<RegisterUserRouteParams, RegisterUserResBody, RegisterUserReqBody, RegisterUserQueryParams>;
export type RegisterUserRouteParams = undefined;
export type RegisterUserReqBody = User;
export type RegisterUserResBody = {token: string};
export type RegisterUserQueryParams = undefined;
