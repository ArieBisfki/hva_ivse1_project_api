import User from "./User";
import { Exercise } from "./workout/Exercise";

export interface ExercisesByUser {
    readonly user: User;
    exercises: Exercise[];
}
