import {exec, Result} from "../../utils/FailOrSuccess";
import ExerciseCategoryRepositoryError  from "./ExerciseCategoryRepositoryError";
import IExerciseCategoryRepository from "./IExerciseCategoryRepository";
import {ExerciseCategory} from "../../models/workout/ExerciseCategory";

const E = ExerciseCategoryRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export const exerciseCategories = (() => {
    const PUSH = "Push";
    const LOWER_BODY = "Lower Body";
    const CARDIO = "Cardio";

    return {
        [PUSH]: new ExerciseCategory(0, PUSH),
        [LOWER_BODY]: new ExerciseCategory(1, LOWER_BODY),
        [CARDIO]: new ExerciseCategory(2, CARDIO)
    };
})();

export default class ExerciseCategoryRepositoryInMem implements IExerciseCategoryRepository {
    private exerciseCategories: ExerciseCategory[] = Object.values(exerciseCategories);

    async create(exerciseCategory: ExerciseCategory): Promise<R<ExerciseCategory, E["DUPLICATE"]>> {
        return exec((resolve, err) => {
            const existingWorkoutLog = this.exerciseCategories.find(ec => ec.id === exerciseCategory.id);
            if (existingWorkoutLog) {
                return err(E.DUPLICATE);
            }

            this.exerciseCategories.push(exerciseCategory);

            resolve(exerciseCategory);
        });
    }

    async update(exerciseCategory: ExerciseCategory): Promise<R<ExerciseCategory, E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            const existingWorkoutLogIndex = this.exerciseCategories.findIndex(ec => ec.id === exerciseCategory.id);
            if (existingWorkoutLogIndex === -1) {
                return err(E.NOT_FOUND);
            }
            this.exerciseCategories[existingWorkoutLogIndex] = exerciseCategory;
            resolve(exerciseCategory);
        });
    }

    async delete(id: number): Promise<R<void, E["NOT_FOUND"]>> {
        return exec((resolve, err) => {
            const sizeBefore = this.exerciseCategories.length;
            this.exerciseCategories = this.exerciseCategories.filter(ec => ec.id === id);
            const sizeAfter = this.exerciseCategories.length;
            if (sizeBefore === sizeAfter) {
                return err(E.NOT_FOUND);
            }
            resolve();
        });
    }
}