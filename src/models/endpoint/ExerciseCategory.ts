import { RequestHandler } from "express";
import { ExerciseCategory } from "../workout/ExerciseCategory";

//Add ExerciseCategory
export type AddExerciseCategoryRequestHandler = RequestHandler<AddExerciseCategoryRouteParams, AddExerciseCategoryResBody, AddExerciseCategoryReqBody, AddExerciseCategoryQueryParams>;
export type AddExerciseCategoryRouteParams = undefined;
export type AddExerciseCategoryReqBody = ExerciseCategory;
export type AddExerciseCategoryResBody = {message: ExerciseCategory};
export type AddExerciseCategoryQueryParams = undefined

//Delete ExerciseCategory
export type DeleteExerciseCategoryRequestHandler = RequestHandler<DeleteExerciseCategoryRouteParams, DeleteExerciseCategoryResBody, DeleteExerciseCategoryReqBody, DeleteExerciseCategoryQueryParams>;
export type DeleteExerciseCategoryRouteParams = {id: number};
export type DeleteExerciseCategoryReqBody = undefined;
export type DeleteExerciseCategoryResBody = undefined;
export type DeleteExerciseCategoryQueryParams = undefined

//Update ExerciseCategory
export type UpdateExerciseCategoryRequestHandler = RequestHandler<UpdateExerciseCategoryRouteParams, UpdateExerciseCategoryResBody, UpdateExerciseCategoryReqBody, UpdateExerciseCategoryQueryParams>;
export type UpdateExerciseCategoryRouteParams = {id: number};
export type UpdateExerciseCategoryReqBody = ExerciseCategory;
export type UpdateExerciseCategoryResBody = {exerciseCategory: ExerciseCategory};
export type UpdateExerciseCategoryQueryParams = undefined