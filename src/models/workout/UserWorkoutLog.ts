import WorkoutLog from "./WorkoutLog";
import { User } from "../User";

export class UserWorkoutLog{
 private user: User;
 private workoutLog: WorkoutLog;

 constructor(user: User, workoutLog: WorkoutLog){
     this.user = user;
     this.workoutLog= workoutLog;
    
 }
}