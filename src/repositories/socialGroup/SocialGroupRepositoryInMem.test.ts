import 'reflect-metadata';
import "./../../populateInMemDb";
import * as users from "../../data/users.json";
import SocialGroupRepositoryInMem from "./SocialGroupRepositoryInMem";
import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import WorkoutLogRepositoryInMem from "../workoutLog/WorkoutLogRepositoryInMem";


describe('testing social group in memory database', () =>{

    const socialGroup = <SocialGroupRepositoryInMem>container.resolve(DI_TOKEN.SocialGroupRepository);
    const workoutLogs = <WorkoutLogRepositoryInMem>container.resolve(DI_TOKEN.WorkoutLogRepository);
    

    test("get all social groups of user by userId", async ()=>{
        const socialGroups = await socialGroup.getByUserId(1);

        expect(socialGroups.length).toEqual(3)
    });

    test("get group by id", async () => {
        const socialGroup1 = await socialGroup.getByGroupId(1);

        expect(socialGroup1).not.toBeUndefined();
        expect(socialGroup1?.id).toEqual(1);
    });

    test("creating a new socialGroup ", async () => {
       
        let logs = await workoutLogs.get(0);

        if(logs)
        await socialGroup.create({
            users: [users.Arie],
            id: 4,
            name: "socialgroup4",
            workoutLogs: logs
        });

        const socialGroup4 = await socialGroup.getByGroupId(4);
        
        expect(socialGroup4).not.toBeUndefined();

    });

    test("update an existing socialGroup", async () => {


        socialGroup.update({
                users: [],
                id: 4,
                name: "updatedSocialgroup4",
                workoutLogs: []
            });

            let updatedSocialgroup4 = await socialGroup.getByGroupId(4);

            if(typeof updatedSocialgroup4 !== "undefined")
            expect(updatedSocialgroup4.name).toEqual("updatedSocialgroup4");

    });

    test("delete a socialGroup", async () => {

        const socialGroup4 = await socialGroup.getByGroupId(4);

        socialGroup.delete(4);
        
        expect(socialGroup4).toBeUndefined();
    });

});