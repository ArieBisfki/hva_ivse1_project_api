import { RequestHandler } from "express";
import { ExerciseLog } from "../ExerciseLog";

//Get Exercise logs
export type GetExerciseLogsRequestHandler = RequestHandler<GetExerciseLogsRouteParams, GetExerciseLogsResBody, GetExerciseLogsReqBody, GetExerciseLogsQueryParams>;
export type GetExerciseLogsRouteParams = undefined;
export type GetExerciseLogsReqBody = undefined;
export type GetExerciseLogsResBody = ExerciseLog[];
export type GetExerciseLogsQueryParams = undefined;

//Add ExerciseLog
export type AddExerciseLogRequestHandler = RequestHandler<AddExerciseLogRouteParams, AddExerciseLogResBody, AddExerciseLogReqBody, AddExerciseLogQueryParams>;
export type AddExerciseLogRouteParams = undefined;
export type AddExerciseLogReqBody = ExerciseLog;
export type AddExerciseLogResBody = {message: ExerciseLog};
export type AddExerciseLogQueryParams = undefined

//Delete ExerciseLog
export type DeleteExerciseLogRequestHandler = RequestHandler<DeleteExerciseLogRouteParams, DeleteExerciseLogResBody, DeleteExerciseLogReqBody, DeleteExerciseLogQueryParams>;
export type DeleteExerciseLogRouteParams = {id: number};
export type DeleteExerciseLogReqBody = undefined;
export type DeleteExerciseLogResBody = {message: string};
export type DeleteExerciseLogQueryParams = undefined

//Update ExerciseLog
export type UpdateExerciseLogRequestHandler = RequestHandler<UpdateExerciseLogRouteParams, UpdateExerciseLogResBody, UpdateExerciseLogReqBody, UpdateExerciseLogQueryParams>;
export type UpdateExerciseLogRouteParams = {id: number};
export type UpdateExerciseLogReqBody = ExerciseLog;
export type UpdateExerciseLogResBody = {message: string, exerciseLog: ExerciseLog};
export type UpdateExerciseLogQueryParams = undefined