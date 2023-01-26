import { Module } from '@nestjs/common';
import { FurnituresService } from './furnitures.service';
import { FurnituresController } from './furnitures.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [FurnituresController],
  providers: [FurnituresService],
  imports: [PrismaModule, UserModule],
})
export class FurnituresModule {}
