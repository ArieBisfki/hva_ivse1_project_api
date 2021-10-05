import Repository from "../Interface";
import WorkoutLog from "../../../models/workout/WorkoutLog";
import Errors from "../Errors";

export default class InMem implements Repository {
    private workoutLogs: WorkoutLog[] = [];

    async delete(id: number): Promise<void> {
        const sizeBefore = this.workoutLogs.length;
        this.workoutLogs = this.workoutLogs.filter(workoutLog => workoutLog.id === id);
        const sizeAfter = this.workoutLogs.length;
        if (sizeBefore === sizeAfter) {
            throw Errors.NOT_FOUND;
        }
    }

    async get(id: number): Promise<WorkoutLog> {
        const workoutLog = this.workoutLogs.find(workoutLog => workoutLog.id === id);
        if (!workoutLog) {
            throw Errors.NOT_FOUND;
        }
        return workoutLog;
    }

    async create(workoutLog: WorkoutLog): Promise<WorkoutLog> {
        const existingWorkoutLog = this.workoutLogs.find(w => w.id === workoutLog.id);
        if (existingWorkoutLog) {
            throw Errors.DUPLICATE;
        }
        return workoutLog;
    }

    async update(workoutLog: WorkoutLog): Promise<WorkoutLog> {
        const existingWorkoutLogIndex = this.workoutLogs.findIndex(w => w.id === workoutLog.id);
        if (existingWorkoutLogIndex === -1) {
            throw Errors.NOT_FOUND;
        }
        this.workoutLogs[existingWorkoutLogIndex] = workoutLog;
        return workoutLog;
    }
}