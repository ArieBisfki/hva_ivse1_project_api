import { Exercise } from './Exercise';
import {ExerciseLog} from '../ExerciseLog';

export class CardioExerciseLog implements ExerciseLog{

    constructor(
        readonly exercise: Exercise,
         readonly duration: number
    ){}

}
