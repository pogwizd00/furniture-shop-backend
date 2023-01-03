import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'isomorphic-dompurify';

export class CreateFurnitureDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    sanitize(value, {
      USE_PROFILES: {
        html: false,
      },
    }),
  )
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsBoolean()
  available: boolean;
}
