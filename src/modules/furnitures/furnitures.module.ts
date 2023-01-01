import { Module } from '@nestjs/common';
import { FurnituresService } from './furnitures.service';
import { FurnituresController } from './furnitures.controller';

@Module({
  providers: [FurnituresService],
  controllers: [FurnituresController]
})
export class FurnituresModule {}
