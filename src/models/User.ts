export class User{


    constructor(
        readonly id: Number,
        readonly username: String, 
        readonly email: String, 
        readonly name: String, 
        readonly bioGender: boolean, 
        readonly height: Number, 
        readonly weight: Number, 
        readonly goal: Goal
    ){}


}

enum Goal {
    LOSE_WEIGHT,
    GAIN_WEIGHT,
    REMAIN_SAME,
    IMPROVE_STAMINA,
}