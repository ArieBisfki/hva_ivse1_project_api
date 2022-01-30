import {Exercise} from "../../models/workout/Exercise";
import {exec, Result, resultIsFail} from "../../utils/FailOrSuccess";
import IUserExerciseRepository from "./IUserExerciseRepository";
import UserExerciseRepositoryError from "./UserExerciseRepositoryError";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";
import {ExercisesByUser} from "../../models/ExercisesByUser";
import {concatWithoutDuplicates} from "../../utils/ArrayUtils";

const E = UserExerciseRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class UserExerciseRepositoryInMem implements IUserExerciseRepository {
    private readonly userExercises: ExercisesByUser[] = [];
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);
    private readonly userRepository = container.resolve(DI_TOKEN.UserRepository);

    create(exercises: Exercise[], user: number): Promise<R<ExercisesByUser, E["NOT_FOUND"] | E["UNKNOWN"]>> {
        return exec(async (resolve, err) => {
            const userModel = await this.userRepository.getById(user);
            if (!userModel) {
                return err(E.NOT_FOUND);
            }

            const userExerciseToCreate: ExercisesByUser = {
                user: userModel,
                exercises: exercises
            };

            const userExercisesResult = await this.crudUtil.createNewOrUpdateExisting({
                models: this.userExercises,
                toCreate: userExerciseToCreate,
                equalityBy: (ue1, ue2) => ue1.user.id === ue2.user.id,
                duplicateMerger: (ue1, ue2) => ({
                    user: ue1.user,
                    exercises: concatWithoutDuplicates(ue1.exercises, ue2.exercises, "id")[0]
                })
            });
            if (!userExercisesResult) {
                return err(E.UNKNOWN);
            } else {
                return resolve(userExercisesResult);
            }
        });
    }

    get(userId: number): Promise<ExercisesByUser | undefined> {
        return this.crudUtil.find({
            models: this.userExercises,
            findBy: ({user: {id: uid}}) => uid === userId
        });
    }

    update(exercises: Exercise[], userId: number): Promise<R<ExercisesByUser, E["NOT_FOUND"] | E["UNKNOWN"]>> {
        return exec(async (resolve, err) => {
            const existingModel = await this.get(userId);
            if (!existingModel) {
                return err(E.NOT_FOUND);
            }

            const userExerciseToUpdate: ExercisesByUser = {
                user: existingModel.user,
                exercises: concatWithoutDuplicates(existingModel.exercises, exercises, "id")[0]
            };

            const updateResult = await this.crudUtil.update({
                models: this.userExercises,
                toUpdate: userExerciseToUpdate,
                findBy: ({user: {id: uid}}) => uid === userId,
                notFoundError: E.NOT_FOUND
            });
            if (resultIsFail(updateResult)) {
                return err(E.UNKNOWN);
            } else {
                return resolve(updateResult.result);
            }
        });
    }

    delete(userId: number, ...exerciseIdsToDelete: number[]): Promise<R<Exercise[], E["NOT_FOUND"]>> {
        return exec(async (resolve, err) => {
            const userExercises = await this.get(userId);
            if (!userExercises) {
                return err(E.NOT_FOUND);
            }

            const deletedExercises: Exercise[] = [];
            userExercises.exercises = userExercises.exercises.filter(exercise => {
                const shouldBeKept = !exerciseIdsToDelete.includes(exercise.id!);

                // Side effect
                if (!shouldBeKept) {
                    deletedExercises.push(exercise);
                }

                return shouldBeKept;
            });

            resolve(deletedExercises);
        });
    }
}
