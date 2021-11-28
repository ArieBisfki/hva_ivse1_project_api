import {Exercise} from "../../models/workout/Exercise";
import {Result} from "../../utils/FailOrSuccess";
import ExerciseRepositoryError from "./ExerciseRepositoryError";

type E = typeof ExerciseRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IExerciseRepository {
    create(exercise: Exercise): P<R<Exercise, E["DUPLICATE"]>>;
    get(userId: number): P<R<Exercise[], E["NOT_FOUND"]>>;
    update(exercise: Exercise): P<R<Exercise, E["NOT_FOUND"]>>;
    delete(id: number): P<R<void, E["NOT_FOUND"]>>
}