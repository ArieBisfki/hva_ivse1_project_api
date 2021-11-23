import WorkoutLog from "../../models/workout/WorkoutLog";
import {Result} from "../../utils/failOrSuccess";
import E from "./Error";

type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IWorkoutLogRepository {
    create(workoutLog: WorkoutLog): P<R<WorkoutLog, E.DUPLICATE>>;
    get(id: number): P<R<WorkoutLog, E.NOT_FOUND>>;
    update(workoutLog: WorkoutLog): P<R<WorkoutLog, E.NOT_FOUND>>;
    delete(id: number): P<R<void, E.NOT_FOUND>>;
}