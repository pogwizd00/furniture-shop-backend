import { IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterFurnituresDto {
  @IsOptional()
  @MinLength(4)
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  type: string;

  @IsOptional()
  @MinLength(4)
  year?: number;
  @Transform(({ value }) => {
    return ['yes', 'true'].includes(value.toLowerCase().trim());
  })
  available?: boolean;
}
