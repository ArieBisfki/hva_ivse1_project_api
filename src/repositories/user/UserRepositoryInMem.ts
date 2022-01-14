import IUserRepository from "./IUserRepository";
import {Result} from "../../utils/FailOrSuccess";
import UserRepositoryError from "./UserRepositoryError";
import User from "../../models/User";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";

const E = UserRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class UserRepositoryInMem implements IUserRepository {
    private readonly users: User[] = [];
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);
    private idCounter = this.users.length;

    create(user: User): Promise<R<User, E["DUPLICATE"]>> {
        const userWithId: User = {
            ...user,
            id: ++this.idCounter
        };
        return this.crudUtil.create({
            models: this.users,
            toCreate: userWithId,
            equalityBy: "id",
            duplicateError: E.DUPLICATE
        });
    }

    getById(id: number): Promise<User | undefined> {
        return this.crudUtil.find({
            models: this.users,
            findBy: ["id", id]
        });
    }

    getByUsername(username: string): Promise<User | undefined> {
        return this.crudUtil.find({
            models: this.users,
            findBy: ["username", username]
        });
    }

    update(user: User): Promise<R<User, E["NOT_FOUND"]>> {
        return this.crudUtil.update({
            models: this.users,
            toUpdate: user,
            findBy: ["id", user.id],
            notFoundError: E.NOT_FOUND
        })
    }

    delete(id: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.users,
            filterBy: ["id", id]
        });
    }
}
