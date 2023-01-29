import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  email: string;
  @IsString()
  country: string;
  @IsString()
  residence: string;
  @IsString()
  postalCode: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  @IsOptional()
  detailsToOrder?: string;
  @IsNumber()
  price: number;
}
