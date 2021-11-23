import {Exercise} from "../../models/workout/Exercise";
import E from "./Error";
import {Result} from "../../utils/failOrSuccess";

type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IExerciseRepository {
    create(exercise: Exercise): P<R<Exercise, E.DUPLICATE>>;
    get(id: number): P<R<Exercise, E.NOT_FOUND>>;
    update(exercise: Exercise): P<R<Exercise, E.NOT_FOUND>>;
    delete(id: number): P<R<void, E.NOT_FOUND>>
}