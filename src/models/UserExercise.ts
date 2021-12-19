import User from "./User";
import { Exercise } from "./workout/Exercise";

export class UserExercise {
    
    constructor(
        readonly user: User,
        readonly exercise: Exercise
        ){}
}