import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {AppDataSource} from "./data-source";
import {User} from "./entities/user";
import {ILike} from "typeorm";

interface UniqueInColumnProps {
    caseSensitive?: boolean;
    targetColumn?: string;
}

export function UniqueInColumn(props?: UniqueInColumnProps, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "UniqueInColumn",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const property = args.property;
                    const propertyValue = value;
                    const repository = AppDataSource.getRepository(User);

                    return !(await repository.findOne({
                        where: {
                            [props?.targetColumn ?? property]: props?.caseSensitive ? propertyValue : ILike(propertyValue),
                        },
                    }));
                },
            },
        });
    };
}