import { Excercise } from './Excercise';
import {ExcerciseLog} from '../interfaces/ExcerciseLog';

export class ResistanceExcerciseLog implements ExcerciseLog{
    excercise: Excercise;
    private reps: Number;
    private sets: Number;
    private weight: Number;

    constructor(excercise: Excercise, reps: Number, sets: Number, weight: Number){
        this.excercise = excercise;
        this.reps = reps;
        this.sets = sets;
        this.weight = weight;
    }

}
