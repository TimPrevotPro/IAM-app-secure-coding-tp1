import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from "typeorm";
import {User} from "./user";
import {ValidationError} from "../validation-error";

@EventSubscriber()
export class UpdateUserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>) {
        console.log('event.entity: ', event.entity);
        let property = 'none';
        if (event.entity.firstName === '') {
            property = 'firstName';
        } else if (event.entity.lastName === '') {
            property = 'lastName';
        } else if (event.entity.email === '') {
            property = 'email';
        } else if (event.entity.passwordHash === '') {
            property = 'passwordHash';
        }
        if (property !== 'none') {
            throw new ValidationError('Invalid user', event.entity, property);
        }
    }

    beforeUpdate(event: UpdateEvent<User>) {
        console.log('event.databaseEntity: ', event.databaseEntity);
        if (event.entity !== undefined) {
            let property = 'none';
            if (event.entity.firstName === '') {
                property = 'firstName';
            } else if (event.entity.lastName === '') {
                property = 'lastName';
            } else if (event.entity.email === '') {
                property = 'email';
            } else if (event.entity.passwordHash === '') {
                property = 'passwordHash';
            }
            if (property !== 'none') {
                throw new ValidationError('Invalid user', event.entity, property);
            }
        }
    }
}