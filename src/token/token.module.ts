import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '../modules/api-config/api-config.service';
@Global()
@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [
    //registerAsync - zaladuj wszystkie moduly a potem je wykorzystaj
    JwtModule.registerAsync({
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        secret: apiConfigService.jwtKey,
      }),
    }),
  ],
})
export class TokenModule {}
