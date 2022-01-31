import {exec, Fail, Result, resultIsFail, Success} from "../FailOrSuccess";
import ICRUDUtil, {BiPredicate, Predicate, KeyValueTuple} from "./ICRUDUtil";
import {DeepReadonly, Primitive} from "utility-types";
import {equalityByFn} from "../FuncUtils";

type R<S, F> = Result<S, F>;

export default class CRUDUtilInMem implements ICRUDUtil {
    async create<Model>(
        {
            models,
            toCreate,
            equalityBy: equalityByUnion
        }: {
            models: Model[]
            toCreate: Model,
            equalityBy: keyof Model | BiPredicate<Model>
        }
    ): Promise<R<Model, { existingModel: Model }>> {
        return exec((resolve, err) => {
            const existingModel = models.find(m => equalityByFn(equalityByUnion)(m, toCreate));

            if (existingModel) {
                return err({existingModel});
            }

            models.push(toCreate);

            return resolve(toCreate);
        });
    }

    async createNewOrUpdateExisting<Model>({
                                         models,
                                         toCreate,
                                         equalityBy: equalityByKeyOrFn,
                                         duplicateMerger
                                     }: {
        models: Model[];
        toCreate: Model;
        equalityBy: keyof Model | BiPredicate<Model>;
        duplicateMerger: (existingModel: Model, newModel: Model) => Model;
    }): Promise<Model | undefined> {
        const createResult = await this.create({
            models,
            toCreate,
            equalityBy: equalityByKeyOrFn
        });
        if (resultIsFail(createResult)) {
            const merged = duplicateMerger(createResult.error.existingModel, toCreate);
            const updateResult = await this.update({
                models,
                toUpdate: merged,
                findBy: (m) => equalityByFn(equalityByKeyOrFn)(m, merged),
                notFoundError: 0
            });
            if (resultIsFail(updateResult)) {
                return;
            } else {
                return merged;
            }
        } else {
            return toCreate;
        }
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
