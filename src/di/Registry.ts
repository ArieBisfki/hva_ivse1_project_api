import {registry} from "tsyringe";
import ExerciseRepository from "../repositories/userExercise/IExerciseRepository";
import WorkoutLogRepository from "../repositories/workoutLog/IWorkoutLogRepository";
import ExerciseRepositoryInMem from "../repositories/userExercise/UserExerciseRepositoryInMem";
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
import SocialGroupRepositoryInMem from "../repositories/socialGroup/SocialGroupRepositoryInMem";
import ISocialGroupRepository from "../repositories/socialGroup/ISocialGroupRepository";

export const DI_TOKEN = Object.freeze(objectFromTuple([
    "ExerciseRepository",
    "WorkoutLogRepository",
    "ExerciseCategoryRepository",
    "UserRepository",
    "SocialGroupRepository",
    "AuthTokenService",
    "CRUDUtilInMem"
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
    SocialGroupRepository: ISocialGroupRepository,
    AuthTokenService: AbstractAuthTokenService,
    CRUDUtilInMem: ICRUDUtil
};

@registry([
    {token: DI_TOKEN.ExerciseRepository, useClass: ExerciseRepositoryInMem},
    {token: DI_TOKEN.WorkoutLogRepository, useClass: WorkoutLogRepositoryInMem},
    {token: DI_TOKEN.ExerciseCategoryRepository, useClass: ExerciseCategoryRepositoryInMem},
    {token: DI_TOKEN.UserRepository, useClass: UserRepositoryInMem},
    {token: DI_TOKEN.SocialGroupRepository, useClass: SocialGroupRepositoryInMem},
    {token: DI_TOKEN.AuthTokenService, useClass: AuthTokenService},
    {token: DI_TOKEN.CRUDUtilInMem, useClass: CRUDUtilInMem}

])
export default class Registry {}