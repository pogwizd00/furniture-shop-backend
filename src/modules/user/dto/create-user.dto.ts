import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueEmailValidator } from '../../../validators/unique-email-validator';
import { PasswordValidator } from '../../../validators/password-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string;
  @IsString()
  @MinLength(8)
  @Validate(PasswordValidator)
  password: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  @IsArray()
  furnituresId?: number[] = [];
}
