import {AppDataSource} from "./data-source"
import {User} from "./entities/user"
import {dropUserTable} from "./specs/helper";
import {ValidationError} from "./validation-error";

AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...")
    await createUser("Timber", "Saw", 'test', 'passwordtest');
    await createUser("Timber2", "Saw", 'test', '');
}).catch(error => console.log(error))

export async function createUser(firstName: string, lastName: string, email: string, passwordHash: string): Promise<User | null | ValidationError> {
    let property = 'none';
    if (firstName === '') {
        property = 'firstName';
    } else if (lastName === '') {
        property = 'lastName';
    } else if (email === '') {
        property = 'email';
    } else if (passwordHash === '') {
        property = 'email';
    }
    const user = new User()
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.passwordHash = passwordHash;
    await AppDataSource.getRepository(User).save(user)
    console.log("Saved a new user with id: ", user.id)
    const savedUser: User | null = await AppDataSource.getRepository(User).findOneBy({id: user.id});
    return savedUser;

}