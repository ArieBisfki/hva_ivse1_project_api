import {InjectionToken, registry} from "tsyringe";
import ExerciseRepositoryInMem from "../repositories/userExercise/UserExerciseRepositoryInMem";
import WorkoutLogRepositoryInMem from "../repositories/workoutLog/WorkoutLogRepositoryInMem";
import ExerciseCategoryRepositoryInMem from "../repositories/exerciseCategory/ExerciseCategoryRepositoryInMem";
import AbstractAuthTokenService from "../auth/AbstractAuthTokenService";
import {AuthTokenService} from "../auth/AuthTokenService";
import CRUDUtilInMem from "../utils/CRUDUtil/CRUDUtilInMem";
import ICRUDUtil from "../utils/CRUDUtil/ICRUDUtil";
import IUserRepository from "../repositories/user/IUserRepository";
import UserRepositoryInMem from "../repositories/user/UserRepositoryInMem";
import SocialGroupRepositoryInMem from "../repositories/socialGroup/SocialGroupRepositoryInMem";
import ISocialGroupRepository from "../repositories/socialGroup/ISocialGroupRepository";
import IUserRefreshTokenRepository from "../repositories/userRefreshTokens/IUserRefreshTokenRepository";
import UserRefreshTokenRepositoryInMem from "../repositories/userRefreshTokens/UserRefreshTokenRepositoryInMem";
import IExerciseRepository from "../repositories/userExercise/IExerciseRepository";
import IWorkoutLogRepository from "../repositories/workoutLog/IWorkoutLogRepository";
import IExerciseCategoryRepository from "../repositories/exerciseCategory/IExerciseCategoryRepository";

export const DI_TOKEN = Object.freeze({
    "ExerciseRepository": Symbol() as InjectionToken<IExerciseRepository>,
    "WorkoutLogRepository": Symbol() as InjectionToken<IWorkoutLogRepository>,
    "ExerciseCategoryRepository": Symbol() as InjectionToken<IExerciseCategoryRepository>,
    "UserRepository": Symbol() as InjectionToken<IUserRepository>,
    "SocialGroupRepository": Symbol() as InjectionToken<ISocialGroupRepository>,
    "AuthTokenService": Symbol() as InjectionToken<AbstractAuthTokenService>,
    "CRUDUtilInMem": Symbol() as InjectionToken<ICRUDUtil>,
    "UserRefreshTokenRepository": Symbol() as InjectionToken<IUserRefreshTokenRepository>
});

@registry([
    {token: DI_TOKEN.ExerciseRepository, useClass: ExerciseRepositoryInMem},
    {token: DI_TOKEN.WorkoutLogRepository, useClass: WorkoutLogRepositoryInMem},
    {token: DI_TOKEN.ExerciseCategoryRepository, useClass: ExerciseCategoryRepositoryInMem},
    {token: DI_TOKEN.UserRepository, useClass: UserRepositoryInMem},
    {token: DI_TOKEN.SocialGroupRepository, useClass: SocialGroupRepositoryInMem},
    {token: DI_TOKEN.AuthTokenService, useClass: AuthTokenService},
    {token: DI_TOKEN.CRUDUtilInMem, useClass: CRUDUtilInMem},
    {token: DI_TOKEN.UserRefreshTokenRepository, useClass: UserRefreshTokenRepositoryInMem}
])
export default class Registry {}