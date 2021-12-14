import {exec, Result} from "../../utils/FailOrSuccess";
import WorkoutLog from "../../models/workout/WorkoutLog";
import IWorkoutLogRepository from "./IWorkoutLogRepository";
import WorkoutLogRepositoryError  from "./WorkoutLogRepositoryError";
import {ResistanceExerciseLog} from "../../models/workout/ResistanceExerciseLog";
import {CardioExerciseLog} from "../../models/workout/CardioExerciseLog";
import {exercisesInit} from "../userExercise/UserExerciseRepositoryInMem";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";
import * as users from "../../data/users.json";

const E = WorkoutLogRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const workoutLogsInit: WorkoutLog[] = [
    {
        id: 1,
        exerciseLogs: [
            new ResistanceExerciseLog(exercisesInit["Bench Press"],10,4,100),
            new ResistanceExerciseLog(exercisesInit.Squat,10,4,150),
            new CardioExerciseLog(exercisesInit.Running,30)
        ],
        date: new Date(),
        user: users.Arie
    }
];

export default class WorkoutLogRepositoryInMem implements IWorkoutLogRepository {
    private readonly workoutLogs: WorkoutLog[] = workoutLogsInit;
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    create(workoutLog: WorkoutLog): Promise<R<WorkoutLog, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.workoutLogs,
            toCreate: workoutLog,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    async get(userId: number): Promise<WorkoutLog[] | undefined> {
        return this.crudUtil.filter({
            models: this.workoutLogs,
            filterBy: workoutLog => workoutLog.user.id === userId
        });
    }

    async update(workoutLog: WorkoutLog): Promise<R<WorkoutLog, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.workoutLogs,
            toUpdate: workoutLog,
            equalityBy: "id",
            notFoundError: E.NOT_FOUND
        });
    }

    async delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.workoutLogs,
            filterBy: ["id", id]
        });
    }
}