import WorkoutLog from "../../models/workout/WorkoutLog";

export default interface Interface {
    create(workoutLog: WorkoutLog): Promise<WorkoutLog>;
    delete(id: number): Promise<void>;
    update(workoutLog: WorkoutLog): Promise<WorkoutLog>;
    get(id: number): Promise<WorkoutLog>;
}