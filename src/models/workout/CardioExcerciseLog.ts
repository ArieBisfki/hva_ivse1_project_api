import { Excercise } from './Excercise';
import {ExcerciseLog} from '../interfaces/ExcerciseLog';

export class CardioExcerciseLog implements ExcerciseLog{
    excercise: Excercise;
    duration: Number;

    constructor(excercise: Excercise, duration: Number){
        this.excercise = excercise;
        this.duration = duration;
    }

}
