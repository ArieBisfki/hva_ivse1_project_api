import {Exercise} from "../../models/workout/Exercise";
import {Result} from "../../utils/FailOrSuccess";
import UserExerciseRepositoryError from "./UserExerciseRepositoryError";

type E = typeof UserExerciseRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IUserExerciseRepository {
    create(exercise: Exercise): P<R<Exercise, E["DUPLICATE"]>>;
    get(userId: number): P<Exercise[] | undefined>;
    update(exercise: Exercise): P<R<Exercise, E["NOT_FOUND"]>>;
    delete(id: number): P<boolean>
}
