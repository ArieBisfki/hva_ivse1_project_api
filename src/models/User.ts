export enum Gender {
    MALE,
    FEMALE,
    OTHER
}

export default interface User {
    readonly id?: number,
    readonly username: string,
    readonly password: string,
    readonly email: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly prefix?: string,
    //readonly profilePicture: string,
    //readonly gender: Gender,
    //readonly height: number,
    //readonly weight: number,
    //readonly goal: Goal
}

export enum Goal {
    LOSE_WEIGHT,
    GAIN_WEIGHT,
    REMAIN_SAME,
    IMPROVE_STAMINA,
}