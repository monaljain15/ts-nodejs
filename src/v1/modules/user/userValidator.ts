import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { memoryUsage } from 'process';
import { Tables } from '../../../config/tables';
import * as My from 'jm-ez-mysql';

@ValidatorConstraint({async: true})
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    public async validate(email: string, args: ValidationArguments) {
        const user = await My.first(Tables.USER, ["id"], "email = ?", [email]);
        if (user) {
            return false;
        } else {
            return true;
        }
    }
}