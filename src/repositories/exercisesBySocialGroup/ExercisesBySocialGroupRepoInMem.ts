import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";
import {SocialGroup} from "../../models/social/SocialGroup";
import ExercisesBySocialGroup from "../../models/social/ExercisesBySocialGroup";
import {Exercise} from "../../models/workout/Exercise";
import {exec, Result, resultIsFail} from "../../utils/FailOrSuccess";
import IExercisesBySocialGroupRepo from "./IExercisesBySocialGroupRepository";
import ExercisesByUserRepositoryError from "./ExercisesByUserRepositoryError";
import {arrayMinus, concatWithoutDuplicates, duplicateCheck} from "../../utils/ArrayUtils";
import {equalityBiPredicateOnProp, equalityPredicateOnProp} from "../../utils/FuncUtils";

const E = ExercisesByUserRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class ExercisesBySocialGroupRepoInMem implements IExercisesBySocialGroupRepo {

    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);
    private readonly exercisesBySocialGroups: ExercisesBySocialGroup[] = [];
    private readonly socialGroupRepository = container.resolve(DI_TOKEN.SocialGroupRepository);

    create(socialGroup: number, exercises: Exercise[]): Promise<R<ExercisesBySocialGroup, E["NOT_FOUND"] | E["UNKNOWN"]>> {
        return exec(async (resolve, err) => {
            const socialGroupModel = await this.socialGroupRepository.getByGroupId(socialGroup)
            if (!socialGroupModel) {
                return err(E.NOT_FOUND);
            }

            const createOrUpdateResult = await this.crudUtil.createNewOrUpdateExisting({
                models: this.exercisesBySocialGroups,
                toCreate: {
                    socialGroup: socialGroupModel,
                    exercises
                },
                equalityBy: (a, b) => a.socialGroup.id === b.socialGroup.id,
                duplicateMerger: (a, b) => ({
                    socialGroup: a.socialGroup,
                    exercises: concatWithoutDuplicates(a.exercises, b.exercises, "id")[0]
                })
            });

            if (!createOrUpdateResult) {
                return err(E.UNKNOWN);
            } else {
                return resolve(createOrUpdateResult);
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
            findBy: ({socialGroup: {id}}) => id === socialGroupId
        });
    }
}
