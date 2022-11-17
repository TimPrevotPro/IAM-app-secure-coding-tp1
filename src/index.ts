import { AppDataSource } from "./data-source"
import { User } from "./entities/user"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.email = "test"
    user.passwordHash = "passwordtest"
    console.log(AppDataSource.entityMetadatas[0].tableName)
    await AppDataSource.getRepository(User).save(user)
    console.log("Saved a new user with id: ", user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))