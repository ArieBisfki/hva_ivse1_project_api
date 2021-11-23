import {Exercise} from "../../models/workout/Exercise";
import {exec, Result} from "../../utils/failOrSuccess";
import IExerciseRepository from "./Interface";
import E from "./Error";

type R<S, F> = Result<S, F>;

export default class ExerciseRepositoryInMem implements IExerciseRepository {
    private exercises: Exercise[] = [];

    async create(exercise: Exercise): Promise<R<Exercise, E.DUPLICATE>> {
        return exec((resolve, err) => {
            const existingExercise = this.exercises.find(w => w.id === exercise.id);
            if (existingExercise) {
                return err(E.DUPLICATE);
            }
            resolve(exercise);
        });
    }

    async get(id: number): Promise<R<Exercise, E.NOT_FOUND>> {
        return exec((resolve, err) => {
            const exercise = this.exercises.find(exercise => exercise.id === id);
            if (!exercise) {
                return err(E.NOT_FOUND);
            }
            resolve(exercise);
        });
    }

    async update(exercise: Exercise): Promise<R<Exercise, E.NOT_FOUND>> {
        return exec((resolve, err) => {
            const existingExerciseIndex = this.exercises.findIndex(e => e.id === exercise.id);
            if (existingExerciseIndex === -1) {
                return err(E.NOT_FOUND);
            }
            this.exercises[existingExerciseIndex] = exercise;
            resolve(exercise);
        });
    }

    async delete(id: number): Promise<R<void, E.NOT_FOUND>> {
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