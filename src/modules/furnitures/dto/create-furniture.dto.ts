import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFurnitureDto {
  @IsString()
  type: string;
  @IsString()
  specific: string;
  @IsNumber()
  prize: number;
  @IsNumber()
  producerId: number;
  @IsOptional()
  @IsNumber()
  userId?: number;
}
