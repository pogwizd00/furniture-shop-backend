import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { type } from 'os';

@Injectable()
@ValidatorConstraint({ name: 'ValidPassword', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Password has to have minimum two numbers';
  }

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (typeof value !== 'string') return false;
    const numbers = value.match(/\d/g);
    if (!numbers) return false;
    return numbers.length >= 2;
  }
}
