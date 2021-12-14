import { SocialGroup }  from "../../models/social/SocialGroup";
import { Exercise } from "../workout/Exercise";

export class ExercisesBySocialGroup {

    constructor(
        readonly socialGroup: SocialGroup,
        readonly exercises: Exercise[],
    ){}
}