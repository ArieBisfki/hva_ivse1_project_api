import {User} from "../User";
import {RequestHandler} from "express";

export type GetUserRequestHandler = RequestHandler<GetUserRouteParams, GetUserResBody, GetUserReqBody, GetUserQueryParams>;
export type GetUserRouteParams = {id: string};
export type GetUserReqBody = undefined;
export type GetUserResBody = {message: User};
export type GetUserQueryParams = undefined;

export type AddUserRequestHandler = RequestHandler<AddUserRouteParams, AddUserResBody, AddUserReqBody, AddUserQueryParams>;
export type AddUserRouteParams = undefined;
export type AddUserReqBody = User;
export type AddUserResBody = {message: User};
export type AddUserQueryParams = undefined;