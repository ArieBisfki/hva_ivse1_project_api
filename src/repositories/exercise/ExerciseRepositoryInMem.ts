import {Exercise} from "../../models/workout/Exercise";
import {exec, Result} from "../../utils/FailOrSuccess";
import IExerciseRepository from "./IExerciseRepository";
import ExerciseRepositoryError from "./ExerciseRepositoryError";
import {exerciseCategoriesInit} from "../exerciseCategory/ExerciseCategoryRepositoryInMem";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";
import * as users from "../../data/users.json";

const E = ExerciseRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const exercisesInit = (() => {
    const BENCH_PRESS = "Bench Press";
    const SQUAT = "Squat";
    const RUNNING = "Running";

    const benchPressExercise: Exercise = {
        id: 1,
        name: BENCH_PRESS,
        category: exerciseCategoriesInit.Push,
        user: users.Arie
    };

    const squatExercise: Exercise = {
        id: 2,
        name: SQUAT,
        category: exerciseCategoriesInit["Lower Body"],
        user: users.Arie
    };

    const runningExercise: Exercise = {
        id: 3,
        name: RUNNING,
        category: exerciseCategoriesInit.Cardio,
        user: users.Arie
    };

    return {
        [BENCH_PRESS]: benchPressExercise,
        [SQUAT]: squatExercise,
        [RUNNING]: runningExercise
    };
})();

export default class ExerciseRepositoryInMem implements IExerciseRepository {
    private readonly exercises: Exercise[] = Object.values(exercisesInit);
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    create(exercise: Exercise): Promise<R<Exercise, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.exercises,
            toCreate: exercise,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    get(userId: number): Promise<Exercise[] | undefined> {
        return this.crudUtil.filter({
            models: this.exercises,
            filterBy: exercise => exercise.user.id === userId
        });
    }

    update(exercise: Exercise): Promise<R<Exercise, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.exercises,
            toUpdate: exercise,
            equalityBy: "id",
            notFoundError: E.NOT_FOUND
        })
    }

    delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.exercises,
            filterBy: ["id", id]
        });
    }
}