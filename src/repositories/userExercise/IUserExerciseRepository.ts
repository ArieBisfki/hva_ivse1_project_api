import {Exercise} from "../../models/workout/Exercise";
import {Result} from "../../utils/FailOrSuccess";
import UserExerciseRepositoryError from "./UserExerciseRepositoryError";
import {ExercisesByUser} from "../../models/ExercisesByUser";

type E = typeof UserExerciseRepositoryError
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IUserExerciseRepository {
    create(exercises: Exercise[], user: number): P<R<ExercisesByUser, E["NOT_FOUND"] | E["UNKNOWN"]>>;
    get(userId: number): P<ExercisesByUser | undefined>;
    update(exercises: Exercise[], user: number): P<R<ExercisesByUser, E["NOT_FOUND"] | E["UNKNOWN"]>>;
    delete(userId: number, ...exerciseIdsToDelete: number[]): Promise<R<Exercise[], E["NOT_FOUND"]>>;
}
