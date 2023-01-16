import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';

@Injectable()
@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'User is already exits !';
  }

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (typeof value !== 'string') return false;
    const user = await this.userService.findByEmail(value);
    if (user) return false;
    return true;
  }
}
