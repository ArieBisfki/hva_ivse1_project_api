import {Exercise} from "../../models/workout/Exercise";
import {exec, Result} from "../../utils/FailOrSuccess";
import IExerciseRepository from "./IExerciseRepository";
import ExerciseRepositoryError from "./ExerciseRepositoryError";
import {exerciseCategories} from "../exerciseCategory/ExerciseCategoryRepositoryInMem";

const E = ExerciseRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const exercises = (() => {
    const BENCH_PRESS = "Bench Press";
    const SQUAT = "Squat";
    const RUNNING = "Running";

    return {
        [BENCH_PRESS]: new Exercise(1, BENCH_PRESS, exerciseCategories.Push),
        [SQUAT]: new Exercise(2, SQUAT, exerciseCategories["Lower Body"]),
        [RUNNING]: new Exercise(3, RUNNING,exerciseCategories.Cardio)
    };
})();

export default class ExerciseRepositoryInMem implements IExerciseRepository {
    private exercises: Exercise[] = Object.values(exercises);

    async create(exercise: Exercise): Promise<R<Exercise, E["DUPLICATE"]>> {
        return exec((resolve, err) => {
            const existingExercise = this.exercises.find(w => w.id === exercise.id);
            if (existingExercise) {
                return err(E.DUPLICATE);
            }

            this.exercises.push(exercise);

            resolve(exercise);
        });
    }

    async get(userId: number): Promise<R<Exercise[], E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            resolve(this.exercises);
        });
    }

    async update(exercise: Exercise): Promise<R<Exercise, E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            const existingExerciseIndex = this.exercises.findIndex(e => e.id === exercise.id);
            if (existingExerciseIndex === -1) {
                return err(E.NOT_FOUND);
            }
            this.exercises[existingExerciseIndex] = exercise;
            resolve(exercise);
        });
    }

    async delete(id: number): Promise<R<void, E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            const sizeBefore = this.exercises.length;
            this.exercises = this.exercises.filter(exercise => exercise.id === id);
            const sizeAfter = this.exercises.length;
            if (sizeBefore === sizeAfter) {
                err(E.NOT_FOUND);
            }
            resolve();
        });
    }
}