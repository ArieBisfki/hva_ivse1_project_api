import {ExerciseCategory} from "./ExerciseCategory";
import User from "../User";

export interface Exercise{
    id?: number,
    readonly name: string,
    readonly category: ExerciseCategory
}
