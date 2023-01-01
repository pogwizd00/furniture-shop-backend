import { Injectable } from '@nestjs/common';
import { furnitures } from './furnitures';
import { FurnituresNotFoundExceptions } from './furnitures.exception';

@Injectable()
export class FurnituresService {
  private furnitures: furnitures[] = [];
  private id = 0;

  public get(): furnitures[] {
    return this.furnitures;
  }

  public getById(id: number): furnitures | undefined {
    const furniture = this.furnitures.find((f) => f.id == id);
    if (!furniture)
      throw new FurnituresNotFoundExceptions('No nie ma tekiego mebla');
    return furniture;
  }

  public create(type: string): furnitures {
    const furniture: furnitures = { id: this.id, type };
    this.id++;
    this.furnitures.push(furniture);
    return furniture;
  }

  public remove(id: number): void {
    const furniture = this.getById(id);
    this.furnitures = this.furnitures.filter((f) => f.id != id);
  }
}
