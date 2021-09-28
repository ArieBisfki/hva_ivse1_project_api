import { SocialGroup } from "./SocialGroup";
import { UserWorkoutLog } from "../workout/UserWorkoutLog";

export class SocialGroupWorkoutLog {
    private userWorkoutLog: UserWorkoutLog;
    private socialGroup: SocialGroup;

    constructor(userWorkoutLog: UserWorkoutLog, socialGroup: SocialGroup){
        this.userWorkoutLog = userWorkoutLog;
        this.socialGroup = socialGroup;
    }
}