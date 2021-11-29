import {exec, Result} from "../FailOrSuccess";
import ICRUDUtil from "./ICRUDUtil";

type R<S, F> = Result<S, F>;

export default class CRUDUtilInMem implements ICRUDUtil {
    create<Model, DuplicateError>({
                                      models,
                                      toCreate,
                                      modelsAreEqualFn,
                                      duplicateError
                                  }: {
        models: Model[]
        toCreate: Model,
        modelsAreEqualFn: (m1: Model, m2: Model) => boolean,
        duplicateError: DuplicateError
    }): Promise<R<Model, DuplicateError>> {
        return exec((resolve, err) => {
            const existingModel = models.find(m => modelsAreEqualFn(m, toCreate));
            if (existingModel) {
                return err(duplicateError);
            }

            models.push(toCreate);

            resolve(toCreate);
        });
    }

    async find<Model>({models, findFn}: {
        models: Model[],
        findFn: (model: Model) => boolean
    }): Promise<Model | undefined> {
        return models.find(findFn);
    }

    async filter<Model>({models, filterFn}: {
        models: Model[],
        filterFn: (model: Model) => boolean
    }): Promise<Model[] | undefined> {
        return models.filter(filterFn);
    }

    update<Model, NotFoundError>({
                                     models,
                                     toUpdate,
                                     equalsFn,
                                     notFoundError
                                 }: {
        models: Model[],
        toUpdate: Model,
        equalsFn: (m1: Model, m2: Model) => boolean,
        notFoundError: NotFoundError
    }): Promise<R<Model, NotFoundError>> {
        return exec((resolve, err) => {
            const indexOfExistingModel = models.findIndex(m => equalsFn(m, toUpdate));
            if (indexOfExistingModel === -1) {
                return err(notFoundError);
            }

            models[indexOfExistingModel] = toUpdate;

            resolve(toUpdate);
        });
    }

    async delete<Model>(config: {
        models: Model[],
        filterFn: (m1: Model) => boolean
    }): Promise<boolean> {
        const {models, filterFn} = config;

        const sizeBefore = models.length;
        config.models = models.filter(filterFn);
        const sizeAfter = models.length;

        return sizeBefore !== sizeAfter;
    }
}