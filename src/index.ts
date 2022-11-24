import {AppDataSource} from "./data-source"
import {User} from "./entities/user"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    await createUser("Timber", "Saw", 'test', 'passwordtest');
}).catch(error => console.log(error))

export async function createUser(firstName: string, lastName: string, email: string, passwordHash: string): Promise<User | null | Error> {
    const user = new User()
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.passwordHash = passwordHash;
    if (!user.email || !user.passwordHash || user.email === '' || user.passwordHash === '') {
        console.log('raising error...');
        throw new Error('email or password is invalid.');
    } else {
        await AppDataSource.getRepository(User).save(user)
        console.log("Saved a new user with id: ", user.id)
        const savedUser: User | null = await AppDataSource.getRepository(User).findOneBy({id: user.id});
        return savedUser;
    }
}