import {exec, Result} from "../../utils/failOrSuccess";
import WorkoutLog from "../../models/workout/WorkoutLog";
import IWorkoutLogRepository from "./Interface";
import E from "./Error";

type R<S, F> = Result<S, F>;

export default class WorkoutLogRepositoryInMem implements IWorkoutLogRepository {
    private workoutLogs: WorkoutLog[] = [];

    async create(workoutLog: WorkoutLog): Promise<R<WorkoutLog, E.DUPLICATE>> {
        return exec((resolve, err) => {
            const existingWorkoutLog = this.workoutLogs.find(w => w.id === workoutLog.id);
            if (existingWorkoutLog) {
                return err(E.DUPLICATE);
            }
            resolve(workoutLog);
        });
    }

    async get(id: number): Promise<R<WorkoutLog, E.NOT_FOUND>> {
        return exec((resolve, err) => {
            const workoutLog = this.workoutLogs.find(workoutLog => workoutLog.id === id);
            if (!workoutLog) {
                return err(E.NOT_FOUND);
            }
            resolve(workoutLog);
        });
    }

    async update(workoutLog: WorkoutLog): Promise<R<WorkoutLog, E.NOT_FOUND>> {
        return exec((resolve, err) => {
            const existingWorkoutLogIndex = this.workoutLogs.findIndex(w => w.id === workoutLog.id);
            if (existingWorkoutLogIndex === -1) {
                return err(E.NOT_FOUND);
            }
            this.workoutLogs[existingWorkoutLogIndex] = workoutLog;
            resolve(workoutLog);
        });
    }

    async delete(id: number): Promise<R<void, E.NOT_FOUND>> {
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