import {AppDataSource} from "../data-source";
import {User} from "../entities/user";

export async function dropUserTable() {
    const repo = AppDataSource.getRepository(User);
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development')
        await repo.query(`TRUNCATE test.user RESTART IDENTITY;`);
    if (process.env.NODE_ENV === 'production')
        await repo.query(`TRUNCATE public.user RESTART IDENTITY;`);
}
