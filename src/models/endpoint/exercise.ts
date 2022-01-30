import { RequestHandler } from "express";
import { Exercise } from "../workout/Exercise";

//Get exercises
export type GetExercisesRequestHandler = RequestHandler<GetExercisesRouteParams, GetExercisesResBody, GetExercisesReqBody, GetExercisesQueryParams>;
export type GetExercisesRouteParams = undefined;
export type GetExercisesReqBody = undefined;
export type GetExercisesResBody = {exercises: Exercise[]};
export type GetExercisesQueryParams = undefined;

//Add Exercise
export type AddExerciseRequestHandler = RequestHandler<AddExerciseRouteParams, AddExerciseResBody, AddExerciseReqBody, AddExerciseQueryParams>;
export type AddExerciseRouteParams = undefined;
export type AddExerciseReqBody = {
    name: string;
    categoryId: number;
};
export type AddExerciseResBody = {exercises: Exercise[]};
export type AddExerciseQueryParams = undefined

//Delete Exercise
export type DeleteExerciseRequestHandler = RequestHandler<DeleteExerciseRouteParams, DeleteExerciseResBody, DeleteExerciseReqBody, DeleteExerciseQueryParams>;
export type DeleteExerciseRouteParams = {id: string};
export type DeleteExerciseReqBody = undefined;
export type DeleteExerciseResBody = undefined;
export type DeleteExerciseQueryParams = undefined

//Update Exercise
export type UpdateExerciseRequestHandler = RequestHandler<UpdateExerciseRouteParams, UpdateExerciseResBody, UpdateExerciseReqBody, UpdateExerciseQueryParams>;
export type UpdateExerciseRouteParams = {id: string};
export type UpdateExerciseReqBody = {
    name: string;
    categoryId: number
};
export type UpdateExerciseResBody = {exercises: Exercise[]};
export type UpdateExerciseQueryParams = undefined
