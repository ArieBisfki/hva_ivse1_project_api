import SocialGroupRepositoryInMem, { socialGroupsInit } from "./SocialGroupRepositoryInMem";
import * as users from "../../data/users.json";
import { workoutLogsInit } from "../workoutLog/WorkoutLogRepositoryInMem";
import workoutLog from "../../controller/workout-log";
import { SocialGroup } from "../../models/social/SocialGroup";


describe('testing social group in memory database', () =>{

    let socialGroupRepositoryInMem : SocialGroupRepositoryInMem;
    
    beforeEach(() => {
        socialGroupRepositoryInMem = new SocialGroupRepositoryInMem;
    });

    test("creating a new socialGroup ", () => {
       
        socialGroupRepositoryInMem.create({
            users: [users.Arie],
            id: 4,
            name: "socialgroup4",
            workoutLogs: workoutLogsInit
        });
        
        expect(socialGroupRepositoryInMem.getByGroupId(4).then(g => g)).not.toBeNull();

    });

    test("update an existing socialGroup", async () => {

        socialGroupRepositoryInMem.update({
                users: [],
                id: 4,
                name: "updatedSocialgroup4",
                workoutLogs: []
            });

            let updatedSocialgroup4 = await socialGroupRepositoryInMem.getByGroupId(4);

            if(typeof updatedSocialgroup4 !== "undefined")
            expect(updatedSocialgroup4.name).toEqual("updatedSocialgroup4");

    });

    test("delete a socialGroup", async () => {

        socialGroupRepositoryInMem.delete(4);
        
        expect(await socialGroupRepositoryInMem.getByGroupId(4)).toBeUndefined();
    });

});