import { AppDataSource } from "./data-source"
import { User } from "./entities/user"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    await createUserTest();
}).catch(error => console.log(error))

export async function createUserTest(): Promise<User | null> {
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.email = "test"
    user.passwordHash = "passwordtest"
    await AppDataSource.getRepository(User).save(user)
    console.log("Saved a new user with id: ", user.id)
    const savedUser: User | null = await AppDataSource.getRepository(User).findOneBy({ id: user.id });
    return savedUser;
}