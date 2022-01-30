import { SocialGroup } from "../../models/social/SocialGroup";
import {Exercise} from "../../models/workout/Exercise";
import {Result} from "../../utils/FailOrSuccess";
import SocialGroupExerciseRepositoryError from "./ExercisesByUserRepositoryError";
import ExercisesBySocialGroup from "../../models/social/ExercisesBySocialGroup";

type E = typeof SocialGroupExerciseRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IExercisesBySocialGroupRepository {
    create(socialGroup: number, exercises: Exercise[]): P<R<ExercisesBySocialGroup, E["NOT_FOUND"] | E["UNKNOWN"]>>;
    get(socialGroupId: number): P<ExercisesBySocialGroup | undefined>;
    delete(socialGroupId: number, ...exerciseIds: number[]): P<R<Exercise[], E["NOT_FOUND"]>>;
    deleteAll(socialGroupId: number): P<boolean>;
}
