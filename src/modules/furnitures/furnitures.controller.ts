import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { FurnituresService } from './furnitures.service';

@Controller('furnitures')
export class FurnituresController {
  constructor(private readonly furnitureService: FurnituresService) {}

  @Get()
  getFurnitures() {
    return this.furnitureService.get();
  }

  @Get(':id')
  getFurnitureById(@Param('id') id: number) {
    return this.furnitureService.getById(id);
  }

  @Post()
  createFurniture(@Body() body: any) {
    return this.furnitureService.create(body.type);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteById(@Param('id') id: number) {
    this.furnitureService.remove(id);
  }
}
