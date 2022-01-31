import { ExercisesByUser } from "../ExercisesByUser";
import ExercisesBySocialGroup  from "./ExercisesBySocialGroup";

export class ExerciseSyncLink {

    constructor(
        readonly userExcercise: ExercisesByUser,
        readonly socialGroupExercise: ExercisesBySocialGroup
    ){}
}
