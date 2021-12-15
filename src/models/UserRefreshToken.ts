import User from "./User";

export default interface UserRefreshToken {
    user: User,
    refreshToken: string
}