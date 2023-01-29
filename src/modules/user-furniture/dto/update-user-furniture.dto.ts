import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFurnitureDto } from './create-user-furniture.dto';

export class UpdateUserFurnitureDto extends PartialType(
  CreateUserFurnitureDto,
) {}
