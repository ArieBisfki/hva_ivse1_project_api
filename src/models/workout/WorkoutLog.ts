import { ExerciseLog } from "../ExerciseLog";
import User from "../User";
import {ResistanceExerciseLog} from "./ResistanceExerciseLog";

export default interface WorkoutLog {
    id?: number,
    readonly user: User,
    readonly exerciseLogs: ExerciseLog[],
    readonly date: Date
}
