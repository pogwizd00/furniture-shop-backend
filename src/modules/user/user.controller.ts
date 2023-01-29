import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user-dto';
import { plainToInstance } from 'class-transformer';
import { UserFurnitureDto } from './dto/userFurniture-dto';
import { UpdateFurnitureDto } from '../furnitures/dto/update-furniture.dto';
import { UpdateFurnitureList } from './dto/updateFurnitureList';
import { ListFurnitureForUserDto } from './dto/listFurnitureForUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(UserDto, user);
  }

  @Get()
  async findAll() {
    const users = this.userService.findAll();
    return plainToInstance(UserDto, users);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findOne(id);
    return new UserFurnitureDto(await user);
  }

  //zmiana z put na patch bo bede zmienial tylko liste furniture
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Get('furnitures-list/:id')
  getListOfFurniture(
    @Param('id', ParseIntPipe) id: number,
    listFurnituresForUser: ListFurnitureForUserDto,
  ) {
    return this.userService.getListOfFurniture(id);
  }

  //na tym etapie wysylac id usera do  funckji updateFurnitureList

  @Post('update_list/:id_user/:id_furniture')
  updateFutnitureList(
    @Param('id_user', ParseIntPipe) id_user: number,
    @Param('id_furniture', ParseIntPipe) id_furniture: number,
    @Body() updateFurnitureList: UpdateFurnitureList,
  ) {
    return this.userService.updateFurnitureList(
      id_user,
      id_furniture,
      updateFurnitureList,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
