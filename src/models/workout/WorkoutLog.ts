import { ExerciseLog } from "../ExerciseLog";
import User from "../User";

export default interface WorkoutLog {
    readonly id?: number,
    readonly user: User,
    readonly exerciseLogs: ExerciseLog[],
    readonly date: Date
}