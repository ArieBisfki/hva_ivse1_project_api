import CRUDUtilInMem from "./CRUDUtilInMem";
import {resultIsFail} from "../FailOrSuccess";
import exp from "constants";

const crudUtil = new CRUDUtilInMem();

interface Person {
    id: number;
    name: string;
}

const persons: Person[] = [
    {
        id: 0,
        name: "Arie"
    },
    {
        id: 1,
        name: "Soufiane"
    },
    {
        id: 2,
        name: "Kai"
    },
    {
        id: 3,
        name: "Costa"
    }
];

test("yeet", async () => {
    const newPerson: Person = {
        id: 4,
        name: "Yeet"
    };

    const result = await crudUtil.create({
        models: persons,
        toCreate: newPerson,
        equalityBy: "id",
        duplicateError: 0
    });

    expect(resultIsFail(result)).toBeFalsy();

    if (resultIsFail(result)) {
        return;
    }

    expect(result.result).toEqual(newPerson);
    expect(persons).toHaveLength(5);
});