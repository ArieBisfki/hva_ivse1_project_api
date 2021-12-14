import {Result} from "../../utils/FailOrSuccess";
import UserRefreshTokenRepositoryError from "./UserRefreshTokenRepositoryError";
import User from "../../models/User";

type E = typeof UserRefreshTokenRepositoryError;
type P<T> = Promise<T>;
type R<S, F> = Result<S, F>;

export default interface IUserRefreshTokenRepository {
    getRefreshTokenByUserId(userId: number): P<string | undefined>;
    updateRefreshTokenForUser(user: number | User, refreshToken: string): P<R<void, E["USER_NOT_FOUND"]>>;
    deleteRefreshTokenForUser(userId: number): P<boolean>;
}