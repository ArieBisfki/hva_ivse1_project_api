import {exec, Result} from "../../utils/FailOrSuccess";
import ExerciseCategoryRepositoryError  from "./ExerciseCategoryRepositoryError";
import IExerciseCategoryRepository from "./IExerciseCategoryRepository";
import {ExerciseCategory} from "../../models/workout/ExerciseCategory";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";

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
    private readonly exerciseCategories: ExerciseCategory[] = Object.values(exerciseCategories);
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    create(exerciseCategory: ExerciseCategory): Promise<R<ExerciseCategory, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.exerciseCategories,
            toCreate: exerciseCategory,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    update(exerciseCategory: ExerciseCategory): Promise<R<ExerciseCategory, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.exerciseCategories,
            toUpdate: exerciseCategory,
            equalityBy: "id",
            notFoundError: E.NOT_FOUND
        })
    }

    delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.exerciseCategories,
            filterBy: ["id", id]
        });
    }
}