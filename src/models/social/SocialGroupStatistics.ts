import { SocialGroupWorkoutLog } from "./SocialGroupWorkoutLog";

export class SocialGroupStatistics{
    private workoutLogs: SocialGroupWorkoutLog;

    constructor(workoutLogs: SocialGroupWorkoutLog){
        this.workoutLogs = workoutLogs;
    }
}