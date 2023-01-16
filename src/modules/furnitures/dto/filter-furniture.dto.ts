import { IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterFurnitureDto {
  @IsOptional()
  @IsString()
  type?: string;
  @IsOptional()
  @Min(1)
  @Max(20)
  @Transform(({ value }: { value: string }) => parseInt(value, 20))
  limit? = 20;
}
