import { UserExercise } from "../UserExercise";
import { ExercisesBySocialGroup } from "./ExercisesBySocialGroup";

export class ExerciseSyncLink {

    constructor(
        readonly userExcercise: UserExercise,
        readonly socialGroupExercise: ExercisesBySocialGroup
    ){}
}