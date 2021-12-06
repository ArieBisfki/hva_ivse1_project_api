import {Result} from "../FailOrSuccess";

export type BiPredicate<Model> = (m1: Model, m2: Model) => boolean;
export type Predicate<Model> = (model: Model) => boolean;
export type KeyValueTuple<Model> = [keyof Model, Model[keyof Model]];

type R<S, F> = Result<S, F>;

export default interface ICRUDUtil {
    create<Model, DuplicateError>(config: {
        models: Model[]
        toCreate: Model,
        equalityBy: keyof Model | BiPredicate<Model>,
        duplicateError: DuplicateError
    }): Promise<R<Model, DuplicateError>>;

    find<Model>(config: {
        models: Model[],
        findBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<Model | undefined>;

    filter<Model>(config: {
        models: Model[],
        filterBy: Predicate<Model>
    }): Promise<Model[] | undefined>;

    update<Model, NotFoundError>(config: {
        models: Model[],
        toUpdate: Model,
        equalityBy: keyof Model | BiPredicate<Model>,
        notFoundError: NotFoundError
    }): Promise<R<Model, NotFoundError>>;

    delete<Model>(config: {
        models: Model[],
        filterBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<boolean>;
}