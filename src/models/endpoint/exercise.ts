import { RequestHandler } from "express";
import { Exercise } from "../workout/Exercise";

//Get exercises
export type GetExercisesRequestHandler = RequestHandler<GetExercisesRouteParams, GetExercisesResBody, GetExercisesReqBody, GetExercisesQueryParams>;
export type GetExercisesRouteParams = undefined;
export type GetExercisesReqBody = undefined;
export type GetExercisesResBody = Exercise[];
export type GetExercisesQueryParams = undefined;

//Add Exercise
export type AddExerciseRequestHandler = RequestHandler<AddExerciseRouteParams, AddExerciseResBody, AddExerciseReqBody, AddExerciseQueryParams>;
export type AddExerciseRouteParams = undefined;
export type AddExerciseReqBody = Exercise;
export type AddExerciseResBody = {message: Exercise};
export type AddExerciseQueryParams = undefined

//Delete Exercise
export type DeleteExerciseRequestHandler = RequestHandler<DeleteExerciseRouteParams, DeleteExerciseResBody, DeleteExerciseReqBody, DeleteExerciseQueryParams>;
export type DeleteExerciseRouteParams = {id: number};
export type DeleteExerciseReqBody = undefined;
export type DeleteExerciseResBody = {message: string};
export type DeleteExerciseQueryParams = undefined

//Update Exercise
export type UpdateExerciseRequestHandler = RequestHandler<UpdateExerciseRouteParams, UpdateExerciseResBody, UpdateExerciseReqBody, UpdateExerciseQueryParams>;
export type UpdateExerciseRouteParams = {id: number};
export type UpdateExerciseReqBody = Exercise;
export type UpdateExerciseResBody = {message: string, exercise: Exercise};
export type UpdateExerciseQueryParams = undefined