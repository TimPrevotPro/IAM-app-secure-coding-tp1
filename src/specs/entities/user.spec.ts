import {describe, test, expect, beforeAll, beforeEach} from "@jest/globals";
import {AppDataSource} from "../../data-source";
import {User} from "../../entities/user";
import {Repository} from "typeorm";

let userRepository: Repository<User>;

describe('user module', () => {
    beforeAll(() => {
        userRepository = AppDataSource.getRepository(User);
    });

    beforeEach(async () => {
        await userRepository.query(`DROP TABLE User`);
    });

    describe('Validations', () => {
        test('Shoud create a new user in the database', () => {

        })
    })
})