import { IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterProducerDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @Min(1)
  @Max(10)
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  limit? = 10;
  @IsOptional()
  @Min(0)
  @Transform(({ value }: { value: string }) => parseInt(value, 2))
  offset? = 0;
}
