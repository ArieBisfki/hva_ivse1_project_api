import IUserRefreshTokenRepository from "./IUserRefreshTokenRepository";
import {exec, resolveSuccess, Result} from "../../utils/FailOrSuccess";
import UserRefreshTokenRepositoryError from "./UserRefreshTokenRepositoryError";
import User from "../../models/User";
import {container} from "tsyringe";
import {DI_TOKEN} from "../../di/Registry";
import UserRefreshToken from "../../models/UserRefreshToken";

const E = UserRefreshTokenRepositoryError;
type E = typeof E;
type R<S, F> = Result<S, F>;

export default class UserRefreshTokenRepositoryInMem implements IUserRefreshTokenRepository {
    private readonly userRefreshTokens: UserRefreshToken[] = [];
    private readonly crudUtil = container.resolve(DI_TOKEN.CRUDUtilInMem);
    private readonly userRepository = container.resolve(DI_TOKEN.UserRepository);

    async getRefreshTokenByUserId(userId: number): Promise<string | undefined> {
        const userRefreshToken = await this.crudUtil.find({
            models: this.userRefreshTokens,
            findBy: ({user: {id}}) => id === userId
        });

        if (!userRefreshToken) {
            return;
        }

        return userRefreshToken.refreshToken;
    }

    private updateRefreshTokenByUserId(userId: number,  refreshToken: string): Promise<R<void, E["USER_NOT_FOUND"]>> {
        return exec(async (resolve, err) => {
            const existingUserRefreshToken = this.userRefreshTokens.find(({user: {id}}) => id === userId);
            if (existingUserRefreshToken) {
                existingUserRefreshToken.refreshToken = refreshToken;
                return resolve();
            }

            const userFromRepository = await this.userRepository.getById(userId);
            if (!userFromRepository) {
                return err(E.USER_NOT_FOUND);
            }

            this.userRefreshTokens.push({
                refreshToken,
                user: userFromRepository
            });

            return resolve();
        });
    }

    private updateRefreshTokenByUserModel(user: User, refreshToken: string): void {
        const existingUserRefreshToken = this.userRefreshTokens.find(({user: {id}}) => id === user.id);
        if (existingUserRefreshToken) {
            existingUserRefreshToken.refreshToken = refreshToken;
            return;
        }

        this.userRefreshTokens.push({
            refreshToken,
            user
        });
    }

    async updateRefreshTokenForUser(user: User | number, refreshToken: string): Promise<R<void, E["USER_NOT_FOUND"]>> {
        if (typeof user === "number") {
            return this.updateRefreshTokenByUserId(user, refreshToken);
        } else {
            this.updateRefreshTokenByUserModel(user, refreshToken);
            return resolveSuccess(undefined);
        }
    }

    deleteRefreshTokenForUser(userId: number): Promise<boolean> {
        return this.crudUtil.delete({
            models: this.userRefreshTokens,
            findBy: ({user: {id}}) => id === userId
        });
    }
}
