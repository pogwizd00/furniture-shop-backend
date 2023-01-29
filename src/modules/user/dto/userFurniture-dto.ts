import { User } from '@prisma/client';

//alias
type UserWithFurnitures = User & { furnitures };

export class UserFurnitureDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  furnitures: number[];
  constructor(user: UserWithFurnitures) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.furnitures = user.furnitures?.map(
      (furniture) => furniture.furnituresId,
    );
  }
}
