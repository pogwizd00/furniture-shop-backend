import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigModule } from './modules/api-config/api-config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { FurnituresModule } from './modules/furnitures/furnitures.module';
import { ProducerModule } from './modules/producer/producer.module';
import { UserModule } from './modules/user/user.module';
import { ValidatorsModule } from './validators/validators.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ApiConfigModule,
    PrismaModule,
    FurnituresModule,
    ProducerModule,
    UserModule,
    ValidatorsModule,
    TokenModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
