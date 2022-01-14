import { container } from "tsyringe";
import { DI_TOKEN } from "../../di/Registry";
import UserRepositoryInMem from "./UserRepositoryInMem";

describe('testing curd operations for users in memory database', () =>{

    const userRepository = <UserRepositoryInMem> container.resolve(DI_TOKEN.UserRepository);
    
    test('create and save user', () =>{
        
        userRepository.create({
                "id": 2,
                "email": "soufiane.amaador@gmail.com",
                "password": "wachtwoord",
                "firstName": "Soufiane",
                "lastName": "Amaador",
                "username": "soufiane_amaador",
                "prefix": ""
              });

        expect(userRepository['users'].find(u => u.id === 2)).not.toBeUndefined();
    
    });

    test('retrieve user by id', async () =>{

        let userId1 = await userRepository.getById(1);

        expect(userId1!.firstName).toEqual("Arie");
        expect(userId1).not.toBeUndefined();

    });

    test('retrieve user by username', async () =>{
        
        const USERNAME_ARIE = "arie_yeet";

        let userArie = await userRepository.getByUsername("arie_yeet");

        expect(userArie).not.toBeUndefined();
        expect(userArie!.firstName).toEqual("Arie");
    });

    test('update user info', async () =>{

        const NEW_EMAIL = "my_new_email@gmail.com";
        const NEW_PASSWORD = "Y33ty33t!1";

        userRepository.update({
            "id": 1,
            "email": NEW_EMAIL,
            "password": NEW_PASSWORD,
            "firstName": "Arie",
            "lastName": "Bisfki",
            "username": "arie_yeet",
            "prefix": ""
          });

          let userArie = await userRepository.getById(1);

          expect(userArie).not.toBeUndefined();
          expect(userArie!.email).toEqual(NEW_EMAIL);
          expect(userArie!.password).toEqual(NEW_PASSWORD);

    });

    test('delete user', async () =>{
        
        let userArie = await userRepository.getById(1);
        expect(userArie).toBeUndefined();

    });
});
