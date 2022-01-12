import {Exercise} from "../../models/workout/Exercise";
import {exec, Result} from "../../utils/FailOrSuccess";
import IUserExerciseRepository from "./IUserExerciseRepository";
import UserExerciseRepositoryError from "./UserExerciseRepositoryError";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";

const E = UserExerciseRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class UserExerciseRepositoryInMem implements IUserExerciseRepository {
    private readonly exercises: Exercise[] = [];
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    create(exercise: Exercise): Promise<R<Exercise, E["DUPLICATE"]>> {
        return this.crudUtil.create({
            models: this.exercises,
            toCreate: exercise,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    // Voorlopige implementatie, get all exercises voor deze user
    get(): Promise<Exercise[] | undefined> {
        return this.crudUtil.filter({
            models: this.exercises,
            filterBy: exercise => true  
        });
    }

    update(exercise: Exercise): Promise<R<Exercise, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.exercises,
            toUpdate: exercise,
            findBy: ["id", exercise.id],
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
