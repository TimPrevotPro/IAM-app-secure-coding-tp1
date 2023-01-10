import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from "typeorm";
import {User} from "./user";
import {validate} from "class-validator";

@EventSubscriber()
export class UpdateUserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>) {
        const errors = await validate(event.entity);
        if (errors.length) throw errors[0];
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        if (!event.entity) throw new Error('No Entity found.');
        const errors = await validate(event.entity);
        if (errors.length) throw errors[0];
    }
}