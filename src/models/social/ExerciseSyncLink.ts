import { UserExercise } from "../UserExercise";
import { ExercisesBySocialGroup } from "./SocialGroupExercise";

export class ExerciseSyncLink {

    constructor(
        readonly userExcercise: UserExercise,
        readonly socialGroupExercise: ExercisesBySocialGroup
    ){}
}