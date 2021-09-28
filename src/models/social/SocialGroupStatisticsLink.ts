import {SocialGroupStatistics} from "./socialGroupStatistics"

export class SocialGroupStatisticsLink{
    private id: String;
    private socialGroupStatistics: SocialGroupStatistics; 
    

    constructor(id: String, socialGroupStatistics: SocialGroupStatistics){
        this.id = id;
        this.socialGroupStatistics = socialGroupStatistics;
    }
        
}