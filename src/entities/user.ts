import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ValidationError} from "../validation-error";

@Entity()
export class User {

    @BeforeInsert() checkInsert = () => {
        if (!this.firstName || this.firstName === '')
            throw new ValidationError('User informations are invalid.', 'user', 'firstName');
        if (!this.lastName || this.lastName === '')
            throw new ValidationError('User informations are invalid', 'user', 'lastName');
        if (!this.email || this.email === '')
            throw new ValidationError('User informations are invalid', 'user', 'email');
        if (!this.passwordHash || this.passwordHash === '')
            throw new ValidationError('User informations are invalid', 'user', 'password');
    };

    @BeforeUpdate() checkUpdate = () => {
        if (!this.firstName || this.firstName === '')
            throw new ValidationError('User informations are invalid.', 'user', 'firstName');
        if (!this.lastName || this.lastName === '')
            throw new ValidationError('User informations are invalid', 'user', 'lastName');
        if (!this.email || this.email === '')
            throw new ValidationError('User informations are invalid', 'user', 'email');
        if (!this.passwordHash || this.passwordHash === '')
            throw new ValidationError('User informations are invalid', 'user', 'password');
    }

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