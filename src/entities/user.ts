import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ValidationError } from "../validation-error";
import {IsEmail, IsString, Length} from "class-validator";

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

    @Column({ nullable: false })
    @IsString()
    firstName!: string;

    @Column({ nullable: false })
    @IsString()
    lastName!: string;

    @Column({ nullable: false })
    @IsEmail()
    email!: string;

    @Column({ nullable: false })
    @Length(8, 24)
    passwordHash!: string;
}