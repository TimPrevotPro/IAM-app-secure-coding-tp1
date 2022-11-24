import {AppDataSource} from "../data-source";
import {User} from "../entities/user";

export async function dropUserTable() {
    const repo = AppDataSource.getRepository(User);
    await repo.query(`TRUNCATE public.user RESTART IDENTITY;`);
}