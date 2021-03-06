import {exec, Result, resultIsFail} from "../../utils/FailOrSuccess";
import ExerciseCategoryRepositoryError  from "./ExerciseCategoryRepositoryError";
import IExerciseCategoryRepository from "./IExerciseCategoryRepository";
import {ExerciseCategory} from "../../models/workout/ExerciseCategory";
import "reflect-metadata"
import {container } from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";

const E = ExerciseCategoryRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class ExerciseCategoryRepositoryInMem implements IExerciseCategoryRepository {
    private exerciseCategories: ExerciseCategory[] = [];
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);
    private newId = 0;

    create(exerciseCategory: ExerciseCategory): Promise<R<ExerciseCategory, E["DUPLICATE"]>> {
        return exec(async (resolve, err) => {
            const createResult = await this.crudUtil.create({
                models: this.exerciseCategories,
                toCreate: exerciseCategory,
                equalityBy: "id"
            });

            if (resultIsFail(createResult)) {
                return err(E.DUPLICATE);
            } else {
                createResult.result.id = this.newId++;
                return resolve(createResult.result);
            }
        });
    }

    get(exerciseCategoryId: number): Promise<ExerciseCategory | undefined> {
        return this.crudUtil.find({
            models: this.exerciseCategories,
            findBy: ["id", exerciseCategoryId]
        });
    }

    update(exerciseCategory: ExerciseCategory): Promise<R<ExerciseCategory, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.exerciseCategories,
            toUpdate: exerciseCategory,
            findBy: ["id", exerciseCategory.id],
            notFoundError: E.NOT_FOUND
        })
    }

    delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.exerciseCategories,
            findBy: ["id", id]
        });
    }
}
