import {Result} from "../FailOrSuccess";

type R<S, F> = Result<S, F>;

export default interface ICRUDUtil {
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
    }): Promise<R<Model, DuplicateError>>;

    find<Model>({models, findFn}: {
        models: Model[],
        findFn: (model: Model) => boolean
    }): Promise<Model | undefined>;

    filter<Model>({models, filterFn}: {
        models: Model[],
        filterFn: (model: Model) => boolean
    }): Promise<Model[] | undefined>;

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
    }): Promise<R<Model, NotFoundError>>;

    delete<Model>(config: {
        models: Model[],
        filterFn: (m1: Model) => boolean
    }): Promise<boolean>;
}