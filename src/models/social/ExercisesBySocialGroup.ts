import { SocialGroup }  from "./SocialGroup";
import { Exercise } from "../workout/Exercise";

export default interface ExercisesBySocialGroup {
    readonly socialGroup: SocialGroup;
    exercises: Exercise[];
}