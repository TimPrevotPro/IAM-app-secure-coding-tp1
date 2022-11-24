import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    constructor(id?: number, firstName?: string, lastName?: string, email?: string, passwordHash?: string) {
        if (id !== undefined)
            this.id = id;
        if (firstName !== undefined)
            this.firstName = firstName;
        if (lastName !== undefined)
            this.lastName = lastName;
        if (email !== undefined)
            this.email = email;
        if (passwordHash !== undefined)
            this.passwordHash = passwordHash;
    }

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    passwordHash!: string;
}