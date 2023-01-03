import {EntitySubscriberInterface, InsertEvent, UpdateEvent} from "typeorm";
import {User} from "./user";
import {validate} from "class-validator";

export class UpdateSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>) {
        console.log('event.entity: ', event.entity);
        void validate(event.entity).then(r => {
            if (r.length > 0) {
                console.log('Validation failed. Errors: ', r);
            } else {
                console.log('Validation succeeded.');
            }
        });
    }

    beforeUpdate(event: UpdateEvent<User>) {
        console.log('event.databaseEntity: ', event.databaseEntity);
        void validate(event.databaseEntity).then(r => {
            if (r.length > 0) {
                console.log('Validation failed. Errors: ', r);
            } else {
                console.log('Validation succeeded.');
            }
        });
    }
}