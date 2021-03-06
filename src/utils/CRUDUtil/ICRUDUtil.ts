import {Result} from "../FailOrSuccess";
import {Primitive} from "utility-types";

export type BiPredicate<Model> = (m1: Model, m2: Model) => boolean;
export type Predicate<Model> = (model: Model) => boolean;
export type KeyValueTuple<Model> = keyof Model extends infer T ? T extends keyof Model ? [T, Model[T]] : never : never;

type R<S, F> = Result<S, F>;

export default interface ICRUDUtil {
    create<Model>(config: {
        models: Model[]
        toCreate: Model,
        equalityBy: keyof Model | BiPredicate<Model>
    }): Promise<R<Model, { existingModel: Model }>>;

    createNewOrUpdateExisting<Model>(config: {
        models: Model[]
        toCreate: Model,
        equalityBy: keyof Model | BiPredicate<Model>,
        duplicateMerger: (existingModel: Model, newModel: Model) => Model
    }): Promise<Model | undefined>;

    find<Model>(config: {
        models: Model[],
        findBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<Model | undefined>;

    filter<Model>(config: {
        models: Model[],
        filterBy: Predicate<Model>
    }): Promise<Model[]>;

    update<Model, NotFoundError>(config: {
        models: Model[],
        toUpdate: Model,
        findBy: KeyValueTuple<Model> | Predicate<Model>,
        notFoundError: NotFoundError
    }): Promise<R<Model, NotFoundError>>;

    delete<Model>(config: {
        models: Model[],
        findBy: KeyValueTuple<Model> | Predicate<Model>
    }): Promise<boolean>;
}
