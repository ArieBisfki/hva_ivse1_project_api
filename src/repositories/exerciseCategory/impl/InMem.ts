import { Errors } from "../..";
import exercise from "../../../controller/exercise";
import { ExerciseCategory } from "../../../models/workout/ExerciseCategory";
import Interface from "../Interface";

export default class InMem implements Interface {
    private exerciseCategories: ExerciseCategory[] = [];

    async delete(id: number): Promise<void> {
        const sizeBefore = this.exerciseCategories.length;
        this.exerciseCategories = this.exerciseCategories.filter(exerciseCategory => exerciseCategory.id !== id);
        const sizeAfter = this.exerciseCategories.length;
        if (sizeBefore === sizeAfter) {
            throw Errors.NOT_FOUND;
        }
    }

    async get(id: number): Promise<ExerciseCategory> {
        const exerciseCategory = this.exerciseCategories.find(exerciseCategory => exerciseCategory.id === id);
        if (!exerciseCategory) {
            throw Errors.NOT_FOUND;
        }
        return exerciseCategory;
    }

    async create(exerciseCategory: ExerciseCategory): Promise<ExerciseCategory> {
        const existingExerciseCategory = this.exerciseCategories.find(e => e.id === exerciseCategory.id);
        if(existingExerciseCategory) {
            throw Errors.DUPLICATE;
        }
        return exerciseCategory;
    }

    async update(exerciseCategory: ExerciseCategory): Promise<ExerciseCategory> {
        const existingExerciseCategory = this.exerciseCategories.findIndex(e => e.id === exerciseCategory.id);
        if(existingExerciseCategory === -1) {
            throw Errors.NOT_FOUND;
        }
        this.exerciseCategories[existingExerciseCategory] = exerciseCategory;
        return exerciseCategory;
    }

}