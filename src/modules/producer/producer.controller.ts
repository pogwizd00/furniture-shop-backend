import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { FilterProducerDto } from './dto/filter-producer-dto';
import { Response } from 'express';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  //querry uzywamy po chcemy ale braly po uwage ograniczenia ktore uzytkownik nam poda w query
  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() filters: FilterProducerDto,
  ) {
    //await jest dlatego uzyty bo sama metoda findAll jest asynchroniczna
    const [producer, count] = await this.producerService.findAll(filters);
    res.set({
      'producer-total': count,
      'producer-limit': filters.limit,
      'producer-offset': filters.offset,
    });
    return producer;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.producerService.findOne(id);
  }

  //gdybys my chceli aby uzytkownik za kazym razem aktualizowal wszystkie dane to musielibysy wykorzystac @Put
  // patch daje mozliwosc do aktualizacji czesiowej danychh => tylko
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.producerService.remove(id);
  }
}
