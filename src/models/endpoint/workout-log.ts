import {RequestHandler} from "express";
import WorkoutLog from "../workout/WorkoutLog";

//Get workoutlogs
export type GetWorkoutLogsRequestHandler = RequestHandler<GetWorkoutLogsRouteParams, GetWorkoutLogsResBody, GetWorkoutLogsReqBody, GetWorkoutLogsQueryParams>;
export type GetWorkoutLogsRouteParams = undefined;
export type GetWorkoutLogsReqBody = undefined;
export type GetWorkoutLogsResBody = { workoutLogs: WorkoutLog[] };
export type GetWorkoutLogsQueryParams = undefined;

//Add WorkoutLog
export type AddWorkoutLogRequestHandler = RequestHandler<AddWorkoutLogRouteParams, AddWorkoutLogResBody, AddWorkoutLogReqBody, AddWorkoutLogQueryParams>;
export type AddWorkoutLogRouteParams = undefined;
export type AddWorkoutLogReqBody = {
    date: number,
    exerciseLogs: Array<{
        exercise: {
            id: number
        },
        sets: Array<{
            reps: number,
            weight: number
        }>
    }>
};
export type AddWorkoutLogResBody = { workoutLog: WorkoutLog };
export type AddWorkoutLogQueryParams = undefined

//Delete WorkoutLog
export type DeleteWorkoutLogRequestHandler = RequestHandler<DeleteWorkoutLogRouteParams, DeleteWorkoutLogResBody, DeleteWorkoutLogReqBody, DeleteWorkoutLogQueryParams>;
export type DeleteWorkoutLogRouteParams = { id: string };
export type DeleteWorkoutLogReqBody = undefined;
export type DeleteWorkoutLogResBody = undefined;
export type DeleteWorkoutLogQueryParams = undefined

//Update WorkoutLog
export type UpdateWorkoutLogRequestHandler = RequestHandler<UpdateWorkoutLogRouteParams, UpdateWorkoutLogResBody, UpdateWorkoutLogReqBody, UpdateWorkoutLogQueryParams>;
export type UpdateWorkoutLogRouteParams = { id: string };
export type UpdateWorkoutLogReqBody = AddWorkoutLogReqBody;
export type UpdateWorkoutLogResBody = { workoutLog: WorkoutLog };
export type UpdateWorkoutLogQueryParams = undefined
