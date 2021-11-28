import {registry} from "tsyringe";
import ExerciseRepository from "../repositories/exercise/IExerciseRepository";
import WorkoutLogRepository from "../repositories/workoutLog/IWorkoutLogRepository";
import ExerciseRepositoryInMem from "../repositories/exercise/ExerciseRepositoryInMem";
import objectFromTuple from "../utils/objectFromTuple";
import WorkoutLogRepositoryInMem from "../repositories/workoutLog/WorkoutLogRepositoryInMem";
import ExerciseCategoryRepository from "../repositories/exerciseCategory/IExerciseCategoryRepository";
import ExerciseCategoryRepositoryInMem from "../repositories/exerciseCategory/ExerciseCategoryRepositoryInMem";
import AbstractAuthTokenService from "../auth/AbstractAuthTokenService";
import {AuthTokenService} from "../auth/AuthTokenService";

export const DI_TOKEN = Object.freeze(objectFromTuple([
    "ExerciseRepository",
    "WorkoutLogRepository",
    "ExerciseCategoryRepository",
    "AuthTokenService"
] as const));

/**
 * Warning: no compiler check for whether these provided values match with the actual provided values inside
 * the registry registrations.
 */
export type DITokenProviderMap = {
    ExerciseRepository: ExerciseRepository,
    WorkoutLogRepository: WorkoutLogRepository,
    ExerciseCategoryRepository: ExerciseCategoryRepository,
    AuthTokenService: AbstractAuthTokenService
};

@registry([
    {token: DI_TOKEN.ExerciseRepository, useClass: ExerciseRepositoryInMem},
    {token: DI_TOKEN.WorkoutLogRepository, useClass: WorkoutLogRepositoryInMem},
    {token: DI_TOKEN.ExerciseCategoryRepository, useClass: ExerciseCategoryRepositoryInMem},
    {token: DI_TOKEN.AuthTokenService, useClass: AuthTokenService}
])
export default class Registry {}