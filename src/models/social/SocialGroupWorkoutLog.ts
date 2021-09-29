import { SocialGroup } from "./SocialGroup";
import { UserWorkoutLog } from "../workout/UserWorkoutLog";

export class SocialGroupWorkoutLog {

    constructor(
        readonly userWorkoutLog: UserWorkoutLog,
        readonly socialGroup: SocialGroup
    ){}
}