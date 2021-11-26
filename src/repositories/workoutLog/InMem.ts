import {exec, Result} from "../../utils/failOrSuccess";
import WorkoutLog from "../../models/workout/WorkoutLog";
import IWorkoutLogRepository from "./Interface";
import WorkoutLogRepositoryError  from "./Error";
import {ResistanceExerciseLog} from "../../models/workout/ResistanceExerciseLog";
import {CardioExerciseLog} from "../../models/workout/CardioExerciseLog";
import {exercises} from "../exercise/InMem";

const E = WorkoutLogRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const workoutLogs = [
    new WorkoutLog(1,[
        new ResistanceExerciseLog(exercises["Bench Press"],10,4,100),
        new ResistanceExerciseLog(exercises.Squat,10,4,150),
        new CardioExerciseLog(exercises.Running,30)
    ], new Date())
];

export default class WorkoutLogRepositoryInMem implements IWorkoutLogRepository {
    private workoutLogs: WorkoutLog[] = workoutLogs;

    async create(workoutLog: WorkoutLog): Promise<R<WorkoutLog, E["DUPLICATE"]>> {
        return exec((resolve, err) => {
            const existingWorkoutLog = this.workoutLogs.find(w => w.id === workoutLog.id);
            if (existingWorkoutLog) {
                return err(E.DUPLICATE);
            }

            this.workoutLogs.push(workoutLog);

            resolve(workoutLog);
        });
    }

    async get(userId: number): Promise<R<WorkoutLog[], E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            resolve(this.workoutLogs);
        });
    }

    async update(workoutLog: WorkoutLog): Promise<R<WorkoutLog, E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            const existingWorkoutLogIndex = this.workoutLogs.findIndex(w => w.id === workoutLog.id);
            if (existingWorkoutLogIndex === -1) {
                return err(E.NOT_FOUND);
            }
            this.workoutLogs[existingWorkoutLogIndex] = workoutLog;
            resolve(workoutLog);
        });
    }

    async delete(id: number): Promise<R<void, E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            const sizeBefore = this.workoutLogs.length;
            this.workoutLogs = this.workoutLogs.filter(workoutLog => workoutLog.id === id);
            const sizeAfter = this.workoutLogs.length;
            if (sizeBefore === sizeAfter) {
                return err(E.NOT_FOUND);
            }
            resolve();
        });
    }
}