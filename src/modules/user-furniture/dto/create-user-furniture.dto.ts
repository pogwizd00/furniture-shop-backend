import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserFurnitureDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;
  @IsNumber()
  @Type(() => Number)
  furnituresId: number;
}
