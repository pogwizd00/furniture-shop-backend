import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnituresModule } from './modules/furnitures/furnitures.module';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigModule } from './modules/api-config/api-config.module';

@Module({
  imports: [
    FurnituresModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ApiConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
