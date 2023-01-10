import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ValidationError } from "../validation-error";
import {IsEmail, isNotEmpty, IsNotEmpty, IsString, Length} from "class-validator";
import {UniqueInColumn} from "../unique-in-column.decorator";

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
    @IsNotEmpty()
    firstName!: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    lastName!: string;

    @Column({
        unique: true,
        transformer: {
            to: (value: string) => value.toString().toLowerCase(),
            from: (value: string) => value,
        },
        nullable: false,
    })
    @IsNotEmpty()
    @UniqueInColumn( { caseSensitive: false }, { message: 'This email is already linked to an account !' })
    email!: string;

    @Column({ nullable: false })
    @Length(8, 24)
    @IsNotEmpty()
    passwordHash!: string;
}