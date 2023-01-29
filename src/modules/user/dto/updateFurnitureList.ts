import { IsNumber } from 'class-validator';

export class UpdateFurnitureList {
  @IsNumber()
  userId?: number;
  @IsNumber()
  furnituresId?: number;
}
