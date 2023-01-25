import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserFurnitureService } from './user-furniture.service';
import { CreateUserFurnitureDto } from './dto/create-user-furniture.dto';
import { UpdateUserFurnitureDto } from './dto/update-user-furniture.dto';

@Controller('user-furniture')
export class UserFurnitureController {
  constructor(private readonly userFurnitureService: UserFurnitureService) {}

  @Post()
  create(@Body() createUserFurnitureDto: CreateUserFurnitureDto) {
    return this.userFurnitureService.create(createUserFurnitureDto);
  }

  @Post('add_furniture')
  addFurnitureToUser(@Body() createUserFurnitureDto: CreateUserFurnitureDto) {
    return this.userFurnitureService.addFurnitureToUser(createUserFurnitureDto);
  }

  @Get()
  findAll() {
    return this.userFurnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userFurnitureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserFurnitureDto: UpdateUserFurnitureDto,
  ) {
    return this.userFurnitureService.update(+id, updateUserFurnitureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFurnitureService.remove(+id);
  }
}
