import { Exercise } from './Exercise';
import {BaseExerciseLog} from "../BaseExerciseLog";

export interface CardioExerciseLog extends BaseExerciseLog {
    readonly exercise: Exercise,
    readonly duration: number
}
