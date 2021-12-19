import CRUDUtilInMem from "./CRUDUtilInMem";
import {resultIsFail, Success} from "../FailOrSuccess";

const crudUtil = new CRUDUtilInMem();

interface Person {
    id: number;
    name: string;
}

describe("CRUDUtil", () => {
    const createPerson = (() => {
        let count = 0;

        return (name: string): Person => ({
            id: count++,
            name
        });
    })();

    const arie = createPerson("Arie");
    const soufiane = createPerson("Soufiane");
    const kai = createPerson("Kai");
    const costa = createPerson("Costa");
    const michel = createPerson("Michel");

    function createPersons(): Person[] {
        return [
            arie,
            soufiane,
            kai,
            costa
        ];
    }

    function createEmptyPersons(): Person[] {
        return [];
    }

    const Error = Object.freeze({
        DUPLICATE: 0,
        NOT_FOUND: 1
    });

    const createCreateConfig = (persons: Person[]) => ({
        models: persons,
        toCreate: michel,
        equalityBy: "id",
        duplicateError: Error.DUPLICATE
    }) as const;

    test("'create'", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const createResult = await crudUtil.create(createCreateConfig(persons));

        if (resultIsFail(createResult)) {
            fail();
        }

        expect(createResult.result).toMatchObject(michel);
        expect(persons).toHaveLength(originalPersonsLength + 1);
        expect(persons[persons.length - 1]).toMatchObject(michel);
    });

    test("'create' in empty", async () => {
        const persons = createEmptyPersons();
        const originalPersonsLength = persons.length;
        const createResult = await crudUtil.create(createCreateConfig(persons));

        if (resultIsFail(createResult)) {
            fail();
        }

        expect(createResult.result).toMatchObject(michel);
        expect(persons).toHaveLength(originalPersonsLength + 1);
        expect(persons[persons.length - 1]).toMatchObject(michel);
    });

    test("'create' duplicate catch", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const createConfig = createCreateConfig(persons);
        const createResult = [
            await crudUtil.create(createConfig),
            await crudUtil.create(createConfig)
        ] as const;

        if (resultIsFail(createResult[0])) {
            fail();
        }

        if (!resultIsFail(createResult[1])) {
            fail();
        }

        expect(createResult[1].error).toEqual(Error.DUPLICATE);
        expect(persons).toHaveLength(originalPersonsLength + 1);
        expect(persons[persons.length - 1]).toMatchObject(michel);
    });

    test("'find' by KeyValueTuple", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const findResult = await crudUtil.find({
            models: persons,
            findBy: ["id", arie.id]
        });

        expect(findResult).toMatchObject(arie);
        expect(persons).toHaveLength(originalPersonsLength);
    });

    test("'find' by Predicate", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const findResult = await crudUtil.find({
            models: persons,
            findBy: ({id}) => id === arie.id
        });

        expect(findResult).toMatchObject(arie);
        expect(persons).toHaveLength(originalPersonsLength);
    });

    test("'find' catch non-existing", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const findResult = await crudUtil.find({
            models: persons,
            findBy: ["id", 5000]
        });

        expect(findResult).toBeUndefined();
        expect(persons).toHaveLength(originalPersonsLength);
    });

    test("'find' in empty: catch non-existing", async () => {
        const persons = createEmptyPersons();
        const findResult = await crudUtil.find({
            models: persons,
            findBy: ["id", 5000]
        });

        expect(findResult).toBeUndefined();
        expect(persons).toHaveLength(0);
    });

    const createLimitConfig = <Model>(models: Model[], maxLength: number) => {
        let count = 0;

        return {
            models,
            filterBy: (model: Model) => ++count <= maxLength
        };
    }

    test("'filter'", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const maxLength = 3;
        const filterResult = await crudUtil.filter(createLimitConfig(persons, maxLength));

        expect(filterResult.length).toBeLessThanOrEqual(maxLength)
        expect(persons).toHaveLength(originalPersonsLength);
    });

    test("'filter' in empty", async () => {
        const persons = createEmptyPersons();
        const originalPersonsLength = persons.length;
        const maxLength = 3;
        const filterResult = await crudUtil.filter(createLimitConfig(persons, maxLength));

        expect(filterResult).toHaveLength(originalPersonsLength)
    });

    test("'update'", async () => {
        const persons = createPersons();
        const originalPersonsLength = persons.length;
        const updatedArie: Person = {
            ...arie,
            id: 10000
        };
        const updateResult = await crudUtil.update({
            models: persons,
            toUpdate: updatedArie,
            findBy: ["id", arie.id],
            notFoundError: Error.NOT_FOUND
        });

        if (resultIsFail(updateResult)) {
            fail();
        }

        expect(updateResult.result).toMatchObject(updatedArie);
        expect(persons).toHaveLength(originalPersonsLength);
        expect(persons.some(person => person.id === updatedArie.id)).toBeTruthy();
    });
});