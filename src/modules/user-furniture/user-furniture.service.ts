import { Injectable } from '@nestjs/common';
import { CreateUserFurnitureDto } from './dto/create-user-furniture.dto';
import { UpdateUserFurnitureDto } from './dto/update-user-furniture.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserFurnitureService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserFurnitureDto: CreateUserFurnitureDto) {
    return 'This action adds a new userFurniture';
  }

  //zapamietaj w dto musza byc takie same nazwy jak psrismaSchema !!

  async addFurnitureToUser(createUserFurnitureDto: CreateUserFurnitureDto) {
    return this.prismaService.userFurniture.create({
      data: {
        userId: createUserFurnitureDto.userId,
        furnituresId: createUserFurnitureDto.furnituresId,
      },
    });
  }
  findAll() {
    return this.prismaService.userFurniture.findMany({});
  }

  findOne(id: number) {
    return `This action updates a #${id} userFurniture`;
  }

  update(
    id: number,
    id_furniture: number,
    updateUserFurnitureDto: UpdateUserFurnitureDto,
  ) {
    return `This action updates a #${id} userFurniture`;
  }

  async remove(id: number, id_furniture: number) {
    await this.prismaService.userFurniture.delete({
      where: {
        userId_furnituresId: {
          userId: id,
          furnituresId: id_furniture,
        },
      },
    });
  }
}
