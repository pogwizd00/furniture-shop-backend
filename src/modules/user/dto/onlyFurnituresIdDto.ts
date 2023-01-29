import { User } from '@prisma/client';

type UserWithFurnitures = User & { furnitures };

export class OnlyFurnituresIdDto {
  furnitures: number[];
  constructor(user: UserWithFurnitures) {
    this.furnitures = user.furnitures?.map(
      (furniture) => furniture.furnituresId,
    );
  }
}
