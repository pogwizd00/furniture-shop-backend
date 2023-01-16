import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilterProducerDto } from './dto/filter-producer-dto';
import { ProducerWhereInput } from 'prisma';

@Injectable()
export class ProducerService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProducerDto: CreateProducerDto) {
    return this.prismaService.producer.create({
      data: {
        name: createProducerDto.name,
        about: createProducerDto.about,
      },
    });
  }

  async findAll(filters: FilterProducerDto) {
    //wszystko to co nizej robilem mialo na celu stronnicowanie
    //ustalenie typu dla where z metody findlAll - trzeba bylo szukac i importowac libki
    const where: ProducerWhereInput = {
      name: {
        contains: filters.name,
      },
    };
    //z regulu na operacji bazodanowej uzywamy awaita ale tutaj nie
    const producer = this.prismaService.producer.findMany({
      where,
      skip: filters.offset,
      take: filters.limit,
    });

    const count = this.prismaService.producer.count({ where });

    return Promise.all([producer, count]);
  }

  async findOne(id: number) {
    const producer = await this.prismaService.producer.findUnique({
      where: {
        id: id,
      },
    });
    if (!producer) throw new NotFoundException('Producer Not Found :((');
    return producer;
  }

  async update(id: number, updateProducerDto: UpdateProducerDto) {
    const producer = await this.findOne(id);
    return this.prismaService.producer.update({
      where: { id },
      data: {
        name: updateProducerDto.name,
      },
    });
  }

  async remove(id: number) {
    const producer = await this.findOne(id);
    await this.prismaService.producer.delete({ where: { id } });
  }
}
