import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FurnituresService } from './furnitures.service';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { FilterFurnituresDto } from './dto/filter-furnitures.dto';

@Controller('furnitures')
export class FurnituresController {
  constructor(private readonly furnitureService: FurnituresService) {}

  @Get()
  getFurnitures(@Query() query: FilterFurnituresDto) {
    return this.furnitureService.get(query);
  }

  @Get(':id')
  getFurnitureById(@Param('id', ParseIntPipe) id: number) {
    return this.furnitureService.getById(id);
  }

  @Post()
  createFurniture(@Body() body: CreateFurnitureDto) {
    return this.furnitureService.create(body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteById(@Param('id', ParseIntPipe) id: number) {
    this.furnitureService.remove(id);
  }
}
