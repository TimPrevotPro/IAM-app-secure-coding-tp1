import {describe, test, expect, beforeAll, beforeEach} from "@jest/globals";
import {AppDataSource} from "../../data-source";
import {User} from "../../entities/user";
import {Repository} from "typeorm";
import {createUser} from "../../index";

import {dropUserTable} from "../helper";

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

    test('Should create a new user in the database', async () => {
        expect(await createUser('Timber', 'Saw', 'test', 'passwordtest')).toStrictEqual(new User(await userRepository.count(), "Timber", "Saw", "test", "passwordtest"));
    });
    test('Should raise error if email is missing', () => {
        void expect(async () => {
            await createUser('Timber2', 'Saw', '', 'passwordtest');
        }).rejects.toThrow(Error);
    })
})