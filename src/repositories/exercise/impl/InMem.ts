import Interface from "../Interface";
import Errors from "../errors";
import {Exercise} from "../../../models/workout/Exercise";

export default class InMem implements Interface {
    private exercises: Exercise[] = [];

    async delete(id: number): Promise<void> {
        const sizeBefore = this.exercises.length;
        this.exercises = this.exercises.filter(exercise => exercise.id === id);
        const sizeAfter = this.exercises.length;
        if (sizeBefore === sizeAfter) {
            throw Errors.NOT_FOUND;
        }
    }

    async get(id: number): Promise<Exercise> {
        const exercise = this.exercises.find(exercise => exercise.id === id);
        if (!exercise) {
            throw Errors.NOT_FOUND;
        }
        return exercise;
    }

    async create(exercise: Exercise): Promise<Exercise> {
        const existingExercise = this.exercises.find(w => w.id === exercise.id);
        if (existingExercise) {
            throw Errors.DUPLICATE;
        }
        return exercise;
    }

    async update(exercise: Exercise): Promise<Exercise> {
        const existingExerciseIndex = this.exercises.findIndex(e => e.id === exercise.id);
        if (existingExerciseIndex === -1) {
            throw Errors.NOT_FOUND;
        }
        this.exercises[existingExerciseIndex] = exercise;
        return exercise;
    }
}