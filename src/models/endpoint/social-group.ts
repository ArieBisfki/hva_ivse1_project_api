import { RequestHandler } from "express";
import { Success } from "../../utils/FailOrSuccess";
import { SocialGroup } from "../social/SocialGroup";
import WorkoutLog from "../workout/WorkoutLog";

// Get social groups of user
export type GetUserSocialGroupsRequestHandler = RequestHandler<GetUserSocialGroupsRouteParams, GetUserSocialGroupsResBody, GetUserSocialGroupsReqBody, GetUserSocialGroupsQueryParams>;
export type GetUserSocialGroupsRouteParams = {id: number};
export type GetUserSocialGroupsReqBody = undefined;
export type GetUserSocialGroupsResBody = {socialGroups: SocialGroup[]};
export type GetUserSocialGroupsQueryParams = undefined;

// Get social groups by query
export type SocialGroupsByQueryRequestHandler = RequestHandler<UserSocialGroupsByQueryRouteParams, UserSocialGroupsByQueryResBody, UserSocialGroupsByQueryReqBody, UserSocialGroupsByQueryQueryParams>;
export type UserSocialGroupsByQueryRouteParams = {query: string};
export type UserSocialGroupsByQueryReqBody = undefined;
export type UserSocialGroupsByQueryResBody = {socialGroups: SocialGroup[]};
export type UserSocialGroupsByQueryQueryParams = undefined;

// Add social group
export type AddSocialGroupRequestHandler = RequestHandler<AddSocialGroupRouteParams, AddSocialGroupResBody, AddSocialGroupReqBody, AddSocialGroupQueryParams>;
export type AddSocialGroupRouteParams = undefined;
export type AddSocialGroupReqBody = SocialGroup;
export type AddSocialGroupResBody = {socialGroup: SocialGroup};
export type AddSocialGroupQueryParams = undefined

// Delete social group
export type DeleteSocialGroupRequestHandler = RequestHandler<DeleteSocialGroupRouteParams, DeleteSocialGroupResBody, DeleteSocialGroupReqBody, DeleteSocialGroupQueryParams>;
export type DeleteSocialGroupRouteParams = {id: number};
export type DeleteSocialGroupReqBody = undefined;
export type DeleteSocialGroupResBody = undefined;
export type DeleteSocialGroupQueryParams = undefined

// Update social group
export type UpdateSocialGroupRequestHandler = RequestHandler<UpdateSocialGroupRouteParams, UpdateSocialGroupResBody, UpdateSocialGroupReqBody, UpdateSocialGroupQueryParams>;
export type UpdateSocialGroupRouteParams = {id: number};
export type UpdateSocialGroupReqBody = {
    users: number[],
    name: string
};
export type UpdateSocialGroupResBody = {socialGroup: SocialGroup};
export type UpdateSocialGroupQueryParams = undefined
