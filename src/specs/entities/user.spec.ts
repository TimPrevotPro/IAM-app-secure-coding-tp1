import {describe, test, expect, beforeAll, beforeEach} from "@jest/globals";
import {AppDataSource} from "../../data-source";
import {User} from "../../entities/user";
import {Repository} from "typeorm";
import {createUserTest} from "../../index";

import {dropUserTable} from "../helper";

let userRepository: Repository<User>;

describe('user module', () => {
    beforeAll(async () => {
        await AppDataSource.initialize().then(() => {
            console.log('Connected to database.')
            userRepository = AppDataSource.getRepository(User);
        });
    });

    beforeEach( async () => {
        console.log("Dropping user table...");
        await dropUserTable();
        console.log('user table dropped successfully.')
    });

    describe('Validations', () => {
        test('Should create a new user in the database', async () => {
            expect(await createUserTest()).toStrictEqual(new User(await userRepository.count(), "Timber", "Saw", "test", "passwordtest"));
        });

    })
})