import {ExerciseCategory} from "./ExerciseCategory";

export class Exercise{
    constructor (
        readonly id: number,
        readonly name: string,
        readonly category: ExerciseCategory
    ){}
}