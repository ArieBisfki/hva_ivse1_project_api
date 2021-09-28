export class User{
private id: Number;
private username: String;
private email: String;
private name: String;
private bioGender: boolean;
private height: Number;
private weight: Number;
private goal: Goal;

constructor(id: Number, username: String, email: String, name: String, bioGender: boolean, height: Number, weight: Number, goal: Goal){
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.bioGender = bioGender;
    this.height = height;
    this.weight = weight;
    this.goal = goal;
}


}

enum Goal {
    LOSE_WEIGHT,GAIN_WEIGHT,REMAIN_SAME,IMPROVE_STAMINA,
}