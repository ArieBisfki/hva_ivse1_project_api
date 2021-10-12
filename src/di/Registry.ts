import {registry} from "tsyringe";
import ExerciseRepository from "../repositories/exercise/Interface";
import WorkoutLogRepository from "../repositories/workoutLog/Interface";
import ExerciseRepositoryInMem from "../repositories/exercise/impl/InMem";
import objectFromTuple from "../utils/objectFromTuple";
import WorkoutLogRepositoryInMem from "../repositories/workoutLog/impl/InMem";

export const DI_TOKEN = Object.freeze(objectFromTuple(["ExerciseRepository", "WorkoutLogRepository"] as const));

/**
 * Warning: no compiler check for whether these provided values match with the actual provided values inside
 * the registry registrations.
 */
export type DITokenProviderMap = {
    ExerciseRepository: ExerciseRepository,
    WorkoutLogRepository: WorkoutLogRepository
};

@registry([
    {token: DI_TOKEN.ExerciseRepository, useClass: ExerciseRepositoryInMem},
    {token: DI_TOKEN.WorkoutLogRepository, useClass: WorkoutLogRepositoryInMem}
])
export default class Registry {}