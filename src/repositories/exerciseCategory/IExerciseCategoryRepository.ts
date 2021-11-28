import {Result} from "../../utils/FailOrSuccess";
import ExerciseCategoryRepositoryError from "./ExerciseCategoryRepositoryError";
import {ExerciseCategory} from "../../models/workout/ExerciseCategory";

type E = typeof ExerciseCategoryRepositoryError;
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IExerciseCategoryRepository {
    create(exerciseCategory: ExerciseCategory): P<R<ExerciseCategory, E["DUPLICATE"]>>;
    update(exerciseCategory: ExerciseCategory): P<R<ExerciseCategory, E["NOT_FOUND"]>>;
    delete(id: number): P<R<void, E["NOT_FOUND"]>>;
}