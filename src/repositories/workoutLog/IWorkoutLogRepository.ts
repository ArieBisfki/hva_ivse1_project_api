import WorkoutLog from "../../models/workout/WorkoutLog";
import {Result} from "../../utils/FailOrSuccess";
import WorkoutLogRepositoryError from "./WorkoutLogRepositoryError";

type E = typeof WorkoutLogRepositoryError;
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IWorkoutLogRepository {
    create(workoutLog: WorkoutLog): P<R<WorkoutLog, E["DUPLICATE"]>>;
    get(userId: number): P<R<WorkoutLog[], E["NOT_FOUND"]>>;
    update(workoutLog: WorkoutLog): P<R<WorkoutLog, E["NOT_FOUND"]>>;
    delete(id: number): P<R<void, E["NOT_FOUND"]>>;
}