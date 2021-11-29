import {Exercise} from "../../models/workout/Exercise";
import {exec, Result} from "../../utils/FailOrSuccess";
import IExerciseRepository from "./IExerciseRepository";
import ExerciseRepositoryError from "./ExerciseRepositoryError";
import {exerciseCategories} from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import User, {Gender, Goal} from "../../models/User";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";

const E = ExerciseRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const exercises = (() => {
    const BENCH_PRESS = "Bench Press";
    const SQUAT = "Squat";
    const RUNNING = "Running";

    const user: User = {
        id: 3,
        email: "arie_bisfki@live.nl",
        password: "Yeetyeet1!",
        firstName: "Arie",
        lastName: "Bisfki",
        username: "arie_yeet",
        prefix: ""
    };

    const benchPressExercise: Exercise = {
        id: 1,
        name: BENCH_PRESS,
        category: exerciseCategories.Push,
        user
    };

    const squatExercise: Exercise = {
        id: 2,
        name: SQUAT,
        category: exerciseCategories["Lower Body"],
        user
    };

    const runningExercise: Exercise = {
        id: 3,
        name: RUNNING,
        category: exerciseCategories.Cardio,
        user
    };

    return {
        [BENCH_PRESS]: benchPressExercise,
        [SQUAT]: squatExercise,
        [RUNNING]: runningExercise
    };
})();

export default class ExerciseRepositoryInMem implements IExerciseRepository {
    private readonly exercises: Exercise[] = Object.values(exercises);
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    async create(exercise: Exercise): Promise<R<Exercise, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.exercises,
            toCreate: exercise,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    async get(userId: number): Promise<Exercise[] | undefined> {
        return this.crudUtil.filter({
            models: this.exercises,
            filterBy: exercise => exercise.user.id === userId
        });
    }

    async update(exercise: Exercise): Promise<R<Exercise, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.exercises,
            toUpdate: exercise,
            equalityBy: "id",
            notFoundError: E.NOT_FOUND
        })
    }

    async delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.exercises,
            filterBy: ["id", id]
        });
    }
}