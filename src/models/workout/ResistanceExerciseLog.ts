import { Exercise } from './Exercise';
import {ExerciseLog} from '../ExerciseLog';

export class ResistanceExerciseLog implements ExerciseLog{

    constructor(
        readonly exercise: Exercise,
        readonly reps: Number, 
        readonly sets: Number, 
        readonly weight: Number
    ){}

}
