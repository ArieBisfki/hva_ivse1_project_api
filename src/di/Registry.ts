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
import CRUDUtilInMem from "../utils/CRUDUtil/CRUDUtilInMem";
import ICRUDUtil from "../utils/CRUDUtil/ICRUDUtil";
import IUserRepository from "../repositories/user/IUserRepository";
import UserRepositoryInMem from "../repositories/user/UserRepositoryInMem";
import IUserRefreshTokenRepository from "../repositories/userRefreshTokens/IUserRefreshTokenRepository";
import UserRefreshTokenRepositoryInMem from "../repositories/userRefreshTokens/UserRefreshTokenRepositoryInMem";

export const DI_TOKEN = Object.freeze(objectFromTuple([
    "ExerciseRepository",
    "WorkoutLogRepository",
    "ExerciseCategoryRepository",
    "UserRepository",
    "AuthTokenService",
    "CRUDUtilInMem",
    "UserRefreshTokenRepository"
] as const));

/**
 * Warning: no compiler check for whether these provided values match with the actual provided values inside
 * the registry registrations.
 */
export type DITokenProviderMap = {
    ExerciseRepository: ExerciseRepository,
    WorkoutLogRepository: WorkoutLogRepository,
    ExerciseCategoryRepository: ExerciseCategoryRepository,
    UserRepository: IUserRepository,
    AuthTokenService: AbstractAuthTokenService,
    CRUDUtilInMem: ICRUDUtil,
    UserRefreshTokenRepository: IUserRefreshTokenRepository
};

@registry([
    {token: DI_TOKEN.ExerciseRepository, useClass: ExerciseRepositoryInMem},
    {token: DI_TOKEN.WorkoutLogRepository, useClass: WorkoutLogRepositoryInMem},
    {token: DI_TOKEN.ExerciseCategoryRepository, useClass: ExerciseCategoryRepositoryInMem},
    {token: DI_TOKEN.UserRepository, useClass: UserRepositoryInMem},
    {token: DI_TOKEN.AuthTokenService, useClass: AuthTokenService},
    {token: DI_TOKEN.CRUDUtilInMem, useClass: CRUDUtilInMem},
    {token: DI_TOKEN.UserRefreshTokenRepository, useClass: UserRefreshTokenRepositoryInMem}
])
export default class Registry {}