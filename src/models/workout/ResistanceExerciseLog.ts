import {BaseExerciseLog} from "../BaseExerciseLog";

export interface ResistanceExerciseLog extends BaseExerciseLog {
    readonly sets: Array<{
        readonly reps: number,
        readonly weight: number
    }>;
}
