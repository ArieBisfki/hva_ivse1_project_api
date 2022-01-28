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

            const modelAlreadyExists = models.some(m => equalityByFn(m, toCreate));
            if (modelAlreadyExists) {
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
                                     findBy,
                                     notFoundError
                                 }: {
        models: Model[],
        toUpdate: Model,
        findBy: KeyValueTuple<Model> | Predicate<Model>,
        notFoundError: NotFoundError
    }): Promise<R<Model, NotFoundError>> {
        return exec((resolve, err) => {
            const findByFn = typeof findBy === "function"
                ? findBy
                : (model: Model) => model[findBy[0]] === findBy[1]

            const indexOfExistingModel = models.findIndex(m => findByFn(m));
            if (indexOfExistingModel === -1) {
                return err(notFoundError);
            }

            models[indexOfExistingModel] = toUpdate;

            resolve(toUpdate);
        });
    }

    async delete<Model>(config: {
        models: Model[],
        findBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<boolean> {
        const {
            models,
            findBy: findByUnion
        } = config;

        const findIndexFn = typeof findByUnion === "function"
            ? findByUnion
            : (model: Model) => model[findByUnion[0]] === findByUnion[1];

        const index = models.findIndex(findIndexFn);
        if (index === -1) {
            return false;
        }

        const sizeBefore = models.length;
        models.splice(index, 1);
        const sizeAfter = models.length;

        return sizeBefore !== sizeAfter;
    }
}
