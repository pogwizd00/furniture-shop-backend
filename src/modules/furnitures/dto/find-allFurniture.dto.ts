import { Exclude } from 'class-transformer';

export class FindAllFurnitureDto {
  type: string;
  specific: string;
  price: string;
  producerId: number;
  @Exclude()
  userId: number;
}
