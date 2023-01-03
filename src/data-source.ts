import "reflect-metadata";
import {DataSource} from "typeorm";
import * as dotenv from 'dotenv';
import {User} from "./entities/user";
import {UpdateSubscriber} from "./entities/update-subscriber";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: checkPgPort(),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [UpdateSubscriber],
    migrations: [],
    schema: getSchema(),
})

function checkPgPort(): number {
    const port = process.env.PG_PORT;
    if (typeof (port) === 'undefined') {
        throw new Error('Postgres port is undefined');
    }
    return parseInt(port);
}

function getSchema(): string {
    let schemaName = "";

    if (process.env.NODE_ENV === "production") {
        schemaName = "public";
    } else {
        schemaName = "test";
    }
    return schemaName;
}
