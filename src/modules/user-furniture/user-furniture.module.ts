import { Module } from '@nestjs/common';
import { UserFurnitureService } from './user-furniture.service';
import { UserFurnitureController } from './user-furniture.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserFurnitureController],
  providers: [UserFurnitureService],
  imports: [PrismaModule],
  exports: [UserFurnitureService],
})
export class UserFurnitureModule {}
