import { SocialGroup } from "../../models/social/SocialGroup";
import {Exercise} from "../../models/workout/Exercise";
import {Result} from "../../utils/FailOrSuccess";
import SocialGroupExerciseRepositoryError from "./ExercisesBySocialGroupRepositoryError";
import ExercisesBySocialGroup from "../../models/social/ExercisesBySocialGroup";

type E = typeof SocialGroupExerciseRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IExercisesBySocialGroupRepository {
    create(socialGroup: number | SocialGroup, exercises: Exercise[]): P<R<Exercise[],
        E["DUPLICATE"] | E["NOT_FOUND"] | E["INTERNAL_ERROR"]>>;
    get(socialGroupId: number): P<ExercisesBySocialGroup | undefined>;
    delete(socialGroupId: number, ...exerciseIds: number[]): P<R<Exercise[], E["NOT_FOUND"]>>;
    deleteAll(socialGroupId: number): P<boolean>;
}
