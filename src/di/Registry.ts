import {registry} from "tsyringe";
import ExerciseRepository from "../repositories/exercise/Interface";
import WorkoutLogRepository from "../repositories/workoutLog/Interface";
import ExerciseRepositoryInMem from "../repositories/exercise/impl/InMem";
import objectFromTuple from "../utils/objectFromTuple";
import WorkoutLogRepositoryInMem from "../repositories/workoutLog/impl/InMem";
import ExerciseCategoryRepository from "../repositories/exerciseCategory/Interface";
import ExerciseCategoryRepositoryInMem from "../repositories/exerciseCategory/impl/InMem";

export const DI_TOKEN = Object.freeze(objectFromTuple(["ExerciseRepository", "WorkoutLogRepository", "ExerciseCategoryRepository"] as const));

/**
 * Warning: no compiler check for whether these provided values match with the actual provided values inside
 * the registry registrations.
 */
export type DITokenProviderMap = {
    ExerciseRepository: ExerciseRepository,
    WorkoutLogRepository: WorkoutLogRepository,
    ExerciseCategoryRepository: ExerciseCategoryRepository,
};

@registry([
    {token: DI_TOKEN.ExerciseRepository, useClass: ExerciseRepositoryInMem},
    {token: DI_TOKEN.WorkoutLogRepository, useClass: WorkoutLogRepositoryInMem},
    {token: DI_TOKEN.ExerciseCategoryRepository, useClass: ExerciseCategoryRepositoryInMem}
])
export default class Registry {}