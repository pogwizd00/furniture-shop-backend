import { Injectable } from '@nestjs/common';
import { furnitures } from './furnitures';
import { FurnituresNotFoundExceptions } from './furnitures.exception';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { FilterFurnituresDto } from './dto/filter-furnitures.dto';

const initFurnitures: furnitures[] = [
  {
    id: 0,
    type: 'szafka',
    name: 'szafka kuchenna',
    year: 2000,
    available: true,
  },
  {
    id: 1,
    type: 'stol',
    name: 'obiadowy',
    year: 2000,
    available: true,
  },
  {
    id: 2,
    type: 'nakastlik',
    name: 'nakastlik nocny',
    year: 2000,
    available: true,
  },
];

//XXS - tsjajentyzacja danych,

@Injectable()
export class FurnituresService {
  private furnitures: furnitures[] = initFurnitures;
  private id = 3;

  public get(query: FilterFurnituresDto): furnitures[] {
    return this.furnitures;
  }

  public getById(id: number): furnitures | undefined {
    const furniture = this.furnitures.find((f) => f.id == id);
    if (!furniture)
      throw new FurnituresNotFoundExceptions('No nie ma tekiego mebla');
    return furniture;
  }

  public create(data: CreateFurnitureDto): furnitures {
    const furniture: furnitures = { ...data, id: this.id };
    this.id++;
    this.furnitures.push(furniture);
    return furniture;
  }

  public remove(id: number): void {
    const furniture = this.getById(id);
    this.furnitures = this.furnitures.filter((f) => f.id != id);
  }
}
