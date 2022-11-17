import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { User } from "./entities/user";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: checkPgPort(),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})

function checkPgPort(): number {
    const port = process.env.PG_PORT;
    if (typeof(port) === 'undefined') {
        throw new Error('Postgres port is undefined');
    }
    return parseInt(port);
}
