import {describe, test, expect, beforeAll, beforeEach} from "@jest/globals";
import {AppDataSource} from "../../data-source";
import {User} from "../../entities/user";
import {Repository} from "typeorm";
import {createUser} from "../../index";

import {dropUserTable} from "../helper";
import {ValidationError} from "class-validator";

let userRepository: Repository<User>;

describe('user module', () => {
    beforeAll(async () => {
        await AppDataSource.initialize().then(() => {
            console.log('Connected to database.')
            userRepository = AppDataSource.getRepository(User);
        });
    });

    beforeEach(async () => {
        console.log("Dropping user table...");
        await dropUserTable();
        console.log('user table dropped successfully.')
    });

    describe('Validations', () => {
        test('Should create a new user in the database', async () => expect(await createUser('Timber', 'Saw', 'test', 'passwordtest'))
            .toMatchObject({
                    id: await userRepository.count(),
                    firstName: "Timber",
                    lastName: "Saw",
                    email: "test",
                    passwordHash: "passwordtest"
                }
            ));
        test('Should raise error if email is missing', () => {
            let newUser;
            void expect(async () => {
                newUser = await createUser('Timber2', 'Saw', '', 'passwordtest');
            }).toThrowError(ValidationError);
        });
        test('Should raise error if password is missing', async () => {
            const user = new User();
            user.id = await userRepository.count();
            user.firstName = "Timber3";
            user.lastName = "Saw";
            user.email = 'test';
            user.passwordHash = '';
            void expect(async () => {
                await userRepository.save(user);
            }).resolves.toThrow(ValidationError);
        })
    });

})
