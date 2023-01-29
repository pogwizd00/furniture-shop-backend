import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prismaService.orders.create({
      data: {
        email: createOrderDto.email,
        country: createOrderDto.country,
        residence: createOrderDto.residence,
        postalCode: createOrderDto.postalCode,
        phoneNumber: createOrderDto.phoneNumber,
        detailsToOrder: createOrderDto.detailsToOrder,
        price: createOrderDto.price,
      },
    });
  }

  findAll() {
    return this.prismaService.orders.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return this.prismaService.orders.delete({
      where: {
        id: id,
      },
    });
  }
}
