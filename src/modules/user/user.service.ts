import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';
import { UpdateFurnitureList } from './dto/updateFurnitureList';
import { ListFurnitureForUserDto } from './dto/listFurnitureForUserDto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const passwd = await argon2.hash(createUserDto.password);
    return this.prismaService.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: passwd,
        furnitures: {
          create: createUserDto.furnituresId?.map((furniture) => ({
            firnitures: {
              connect: {
                id: furniture,
              },
            },
          })),
        },
      },
      include: {
        furnitures: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({});
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      // select: {
      //   furnitures: true,
      // },
      include: {
        furnitures: {},
      },
    });
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }

  async getListOfFurniture(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        furnitures: {
          select: {
            furnituresId: true,
          },
        },
      },
    });
  }

  //todo tutaj bede musial po pobraniu usera jakos unhashtagowac haslo

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const passwd = await argon2.hash(updateUserDto.password);
    return this.prismaService.user.update({
      where: { id },
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        email: updateUserDto.email,
        password: passwd,
      },
    });
  }

  async updateFurnitureList(
    id: number,
    id_furniture: number,
    updateFurnitureList: UpdateFurnitureList,
  ) {
    const user = await this.findOne(id);
    return this.prismaService.userFurniture.create({
      data: {
        userId: updateFurnitureList.userId,
        furnituresId: updateFurnitureList.furnituresId,
      },
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
