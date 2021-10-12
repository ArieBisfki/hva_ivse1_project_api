import { ExerciseLog } from "../ExerciseLog";
import { RequestHandler } from "express";
import { GetUserQueryParams } from "./user-controller";
import { ResistanceExerciseLog } from "../workout/ResistanceExerciseLog";

//Get exercises
export type GetExercisesRequestHandler = RequestHandler<GetExercisesRouteParams, GetExercisesResBody, GetExercisesReqBody, GetExercisesQueryParams>;
export type GetExercisesRouteParams = undefined;
export type GetExercisesReqBody = undefined;
export type GetExercisesResBody = ExerciseLog[];
export type GetExercisesQueryParams = undefined;

//Add exercise
export type AddExerciseRequestHandler = RequestHandler<AddExerciseRouteParams, AddExerciseResBody, AddExerciseReqBody, AddExerciseQueryParams>;
export type AddExerciseRouteParams = undefined;
export type AddExerciseReqBody = ExerciseLog;
export type AddExerciseResBody = {message: ExerciseLog};
export type AddExerciseQueryParams = undefined

//Delete exercise
export type DeleteExerciseRequestHandler = RequestHandler<DeleteExerciseRouteParams, DeleteExerciseResBody, DeleteExerciseReqBody, DeleteExerciseQueryParams>;
export type DeleteExerciseRouteParams = {id: number};
export type DeleteExerciseReqBody = undefined;
export type DeleteExerciseResBody = {message: string};
export type DeleteExerciseQueryParams = undefined

//Update exercise
export type UpdateExerciseRequestHandler = RequestHandler<UpdateExerciseRouteParams, UpdateExerciseResBody, UpdateExerciseReqBody, UpdateExerciseQueryParams>;
export type UpdateExerciseRouteParams = {id: number};
export type UpdateExerciseReqBody = ExerciseLog;
export type UpdateExerciseResBody = {message: string, exercise: ExerciseLog};
export type UpdateExerciseQueryParams = undefined