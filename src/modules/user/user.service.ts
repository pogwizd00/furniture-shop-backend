import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';

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
    });
    if (!user) throw new NotFoundException("User doesn't exist");
    return user;
  }

  //todo tutaj bede musial po pobraniu usera jakos unhashtagowac haslo
  async update(id: number, updateUserDto: UpdateUserDto) {
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

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
