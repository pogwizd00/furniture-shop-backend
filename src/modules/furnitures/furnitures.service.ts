import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilterFurnitureDto } from './dto/filter-furniture.dto';
import { FurnituresWhereInput } from 'prisma';
import { FindAllFurnitureDto } from './dto/find-allFurniture.dto';

@Injectable()
export class FurnituresService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createFurnitureDto: CreateFurnitureDto) {
    const { userId } = createFurnitureDto;
    const { producerId } = createFurnitureDto;
    return this.prismaService.furnitures.create({
      data: {
        type: createFurnitureDto.type,
        specific: createFurnitureDto.specific,
        price: createFurnitureDto.prize,
        producerId: producerId,
      },
    });
  }
  //todo oraz jest problem z kluczem producerId bo jest unique i nie mozna dodac rekordow do niego
  //todo nie widzi type nie wiadomo dlaczego
  findAll() {
    return this.prismaService.furnitures.findMany({});
  }

  async findOne(id: number) {
    const furniture = await this.prismaService.furnitures.findUnique({
      where: {
        id: id,
      },
      include: {
        producer: {
          select: {
            name: true,
            about: true,
          },
        },
      },
    });
    if (!furniture) throw new NotFoundException('Furniture Not Found :((');
    return furniture;
  }

  update(id: number, updateFurnitureDto: UpdateFurnitureDto) {
    const furniture = this.findOne(id);
    return this.prismaService.furnitures.update({
      where: { id },
      data: {
        price: updateFurnitureDto.prize,
        specific: updateFurnitureDto.specific,
      },
    });
  }

  async remove(id: number) {
    const furniture = this.findOne(id);
    await this.prismaService.furnitures.delete({ where: { id } });
  }
}
