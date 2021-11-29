import {ExerciseCategory} from "./ExerciseCategory";
import User from "../User";

export interface Exercise{
    readonly id: number,
    readonly name: string,
    readonly category: ExerciseCategory,
    readonly user: User
}