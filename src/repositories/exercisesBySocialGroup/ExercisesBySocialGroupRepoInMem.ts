import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";
import {SocialGroup} from "../../models/social/SocialGroup";
import ExercisesBySocialGroup from "../../models/social/ExercisesBySocialGroup";
import {Exercise} from "../../models/workout/Exercise";
import {exec, Result, resultIsFail} from "../../utils/FailOrSuccess";
import ISocialGroupExerciseRepository from "./IExercisesBySocialGroupRepository";
import ExercisesBySocialGroupRepositoryError from "./ExercisesBySocialGroupRepositoryError";
import {arrayMinus, concatWithoutDuplicates, duplicateCheck} from "../../utils/ArrayUtils";
import {equalityBiPredicateOnProp, equalityPredicateOnProp} from "../../utils/FuncUtils";

const E = ExercisesBySocialGroupRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class ExercisesBySocialGroupRepoInMem implements ISocialGroupExerciseRepository {

    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);

    private readonly exercisesBySocialGroups: ExercisesBySocialGroup[] = [];

    private readonly socialGroupRepository = container.resolve(DI_TOKEN.SocialGroupRepository);

    create(socialGroup: number | SocialGroup, exercises: Exercise[]): Promise<R<Exercise[],
        E["DUPLICATE"] | E["NOT_FOUND"] | E["INTERNAL_ERROR"]>> {
        return exec(async (resolve, err) => {
            // Narrow socialGroup type to just SocialGroup
            const socialGroupModel = typeof socialGroup === "number"
                ? await this.socialGroupRepository.getByGroupId(socialGroup)
                : socialGroup;
            if (!socialGroupModel) {
                return err(E.NOT_FOUND);
            }

            // Duplicates check
            const [nonDuplicateExercises] = duplicateCheck(exercises).equalityBy("id");


            // Attempt create
            const createResult = await this.crudUtil.create({
                models: this.exercisesBySocialGroups,
                toCreate: {
                    socialGroup: socialGroupModel,
                    exercises: nonDuplicateExercises
                },
                equalityBy: (a, b) => a.socialGroup.id === b.socialGroup.id,
                duplicateError: E.DUPLICATE
            });

            if (!resultIsFail(createResult)) {
                // Success: all non duplicate exercises were added
                return resolve(nonDuplicateExercises);
            } else {
                // Find existing exercises
                const existingExercises = await this.get(socialGroupModel.id)
                    .then(result => result?.exercises);
                if (!existingExercises) {
                    // Find logically shouldn't fail due to "create" earlier returning a duplicate error
                    return err(E.INTERNAL_ERROR);
                }

                // Compose updated exercises list
                const [updatedExercises, duplicateExercisesForUpdate] = concatWithoutDuplicates(existingExercises, nonDuplicateExercises, "id");

                // Attempt update
                const updateResult = await this.crudUtil.update({
                    models: this.exercisesBySocialGroups,
                    toUpdate: {
                        socialGroup: socialGroupModel,
                        exercises: updatedExercises
                    },
                    findBy: ({socialGroup: {id}}) => id === socialGroupModel.id,
                    notFoundError: E.NOT_FOUND
                });
                if (resultIsFail(updateResult)) {
                    // Update logically shouldn't fail due to "create" earlier returning a duplicate error
                    return err(E.INTERNAL_ERROR);
                } else {
                    const nonDuplicateExercisesForUpdate = arrayMinus(nonDuplicateExercises, duplicateExercisesForUpdate, equalityBiPredicateOnProp("id"))
                    return resolve(nonDuplicateExercisesForUpdate);
                }
            }
        });
    }

    get(socialGroupId: number): Promise<ExercisesBySocialGroup | undefined> {
        return this.crudUtil.find({
            models: this.exercisesBySocialGroups,
            findBy: ({socialGroup: {id}}) => id === socialGroupId
        });
    }

    delete(socialGroupId: number, ...exerciseIdsToDelete: number[]): Promise<R<Exercise[], E["NOT_FOUND"]>> {
        return exec(async (resolve, err) => {
            const exercisesBySocialGroup = await this.get(socialGroupId);
            if (!exercisesBySocialGroup) {
                return err(E.NOT_FOUND);
            }

            const deletedExercises: Exercise[] = [];
            exercisesBySocialGroup.exercises = exercisesBySocialGroup.exercises.filter(exercise => {
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

    deleteAll(socialGroupId: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.exercisesBySocialGroups,
            filterBy: ({socialGroup: {id}}) => id === socialGroupId
        });
    }
}
