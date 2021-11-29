import {Result} from "../../utils/FailOrSuccess";
import UserRepositoryError from "./UserRepositoryError";
import User from "../../models/User";

type E = typeof UserRepositoryError;
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IUserRepository {
    create(user: User): P<R<User, E["DUPLICATE"]>>;
    get(id: number): P<User | undefined>;
    update(user: User): P<R<User, E["NOT_FOUND"]>>;
    delete(id: number): P<boolean>;
}