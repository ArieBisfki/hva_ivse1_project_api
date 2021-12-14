import { SocialGroup } from "../../models/social/SocialGroup";
import {Exercise} from "../../models/workout/Exercise";
import {Result} from "../../utils/FailOrSuccess";
import SocialGroupExerciseRepositoryError from "./ExercisesBySocialGroupRepositoryError";

type E = typeof SocialGroupExerciseRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IExercisesBySocialGroupRepository {
    create(socialGroup: number | SocialGroup, exercises: Exercise[]): P<R<void, E["DUPLICATE"]>>;
    get(socialGroupId: number): P<Exercise[] | undefined>;
    update(exercise: Exercise): P<R<Exercise[], E["NOT_FOUND"]>>;
    delete(id: number): P<boolean>
}