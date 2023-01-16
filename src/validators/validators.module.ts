import { Module } from '@nestjs/common';
import { UniqueEmailValidator } from './unique-email-validator';
import { PasswordValidator } from './password-validator';
import { UserModule } from '../modules/user/user.module';

@Module({
  providers: [UniqueEmailValidator, PasswordValidator],
  exports: [UniqueEmailValidator, PasswordValidator],
  imports: [UserModule],
})
export class ValidatorsModule {}
