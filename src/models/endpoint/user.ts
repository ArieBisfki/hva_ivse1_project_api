import User from "../User";
import {RequestHandler} from "express";

// Get user
export type GetUserRequestHandler = RequestHandler<GetUserRouteParams, GetUserResBody, GetUserReqBody, GetUserQueryParams>;
export type GetUserRouteParams = {id: string};
export type GetUserReqBody = undefined;
export type GetUserResBody = {message: User};
export type GetUserQueryParams = undefined;

// Add user
export type AddUserRequestHandler = RequestHandler<AddUserRouteParams, AddUserResBody, AddUserReqBody, AddUserQueryParams>;
export type AddUserRouteParams = undefined;
export type AddUserReqBody = User;
export type AddUserResBody = {message: User};
export type AddUserQueryParams = undefined;

// Login user
export type LoginUserRequestHandler = RequestHandler<LoginUserRouteParams, LoginUserResBody, LoginUserReqBody, LoginUserQueryParams>;
export type LoginUserRouteParams = undefined;
export type LoginUserReqBody = {username: string, password: string}; 
export type LoginUserResBody = {token: string};//Hier moet de token komen
export type LoginUserQueryParams = undefined;

// Register user
export type RegisterUserRequestHandler = RequestHandler<RegisterUserRouteParams, RegisterUserResBody, RegisterUserReqBody, RegisterUserQueryParams>;
export type RegisterUserRouteParams = undefined;
export type RegisterUserReqBody = User; 
export type RegisterUserResBody = {token: string};
export type RegisterUserQueryParams = undefined;