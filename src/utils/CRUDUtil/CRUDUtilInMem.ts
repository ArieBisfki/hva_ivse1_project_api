import {exec, Result} from "../FailOrSuccess";
import ICRUDUtil, {BiPredicate, Predicate, KeyValueTuple} from "./ICRUDUtil";

type R<S, F> = Result<S, F>;

export default class CRUDUtilInMem implements ICRUDUtil {
    private equalityByUnionToFn<Model>(union: keyof Model | BiPredicate<Model>): BiPredicate<Model> {
        return typeof union === "function"
            ? union
            : (m1, m2) => m1[union] === m2[union];
    }

    create<Model, DuplicateError>({
                                      models,
                                      toCreate,
                                      equalityBy: equalityByUnion,
                                      duplicateError
                                  }: {
        models: Model[]
        toCreate: Model,
        equalityBy: keyof Model | BiPredicate<Model>,
        duplicateError: DuplicateError
    }): Promise<R<Model, DuplicateError>> {
        return exec((resolve, err) => {
            const equalityByFn = this.equalityByUnionToFn(equalityByUnion);

            const existingModel = models.find(m => equalityByFn(m, toCreate));
            if (existingModel) {
                return err(duplicateError);
            }

            models.push(toCreate);

            resolve(toCreate);
        });
    }

    async find<Model>({models, findBy}: {
        models: Model[],
        findBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<Model | undefined> {
        const findByFn = typeof findBy === "function"
            ? findBy
            : (model: Model) => model[findBy[0]] === findBy[1]
        return models.find(findByFn);
    }

    async filter<Model>({models, filterBy}: {
        models: Model[],
        filterBy: Predicate<Model>
    }): Promise<Model[]> {
        return models.filter(filterBy);
    }

    update<Model, NotFoundError>({
                                     models,
                                     toUpdate,
                                     equalityBy: equalityByUnion,
                                     notFoundError
                                 }: {
        models: Model[],
        toUpdate: Model,
        equalityBy: keyof Model | BiPredicate<Model>,
        notFoundError: NotFoundError
    }): Promise<R<Model, NotFoundError>> {
        return exec((resolve, err) => {
            const equalityByFn = this.equalityByUnionToFn(equalityByUnion);

            const indexOfExistingModel = models.findIndex(m => equalityByFn(m, toUpdate));
            if (indexOfExistingModel === -1) {
                return err(notFoundError);
            }

            models[indexOfExistingModel] = toUpdate;

            resolve(toUpdate);
        });
    }

    async delete<Model>(config: {
        models: Model[],
        filterBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<boolean> {
        const {
            models,
            filterBy: filterByUnion
        } = config;

        const filterByFn = typeof filterByUnion === "function"
            ? filterByUnion
            : (model: Model) => model[filterByUnion[0]] === filterByUnion[1];

        const sizeBefore = models.length;
        config.models = models.filter(filterByFn);
        const sizeAfter = models.length;

        return sizeBefore !== sizeAfter;
    }
}