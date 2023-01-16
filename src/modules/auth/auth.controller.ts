import { Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { BasicGuard } from '../../guards/basic.guard';
import { UserId } from '../../decorators/user-id-decorator';
import { TokenService } from '../../token/token.service';
import { Response } from 'express';
import { TokenGuard } from '../../guards/token-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(BasicGuard)
  //zeby wyciagnac uzytkownika z zapytania uzyjemy do tego dekoratora
  //passthorugh nie pozbawiamy sie mozliwosci zwracania rzeczy z controlera
  login(@UserId() userId: number, @Res({ passthrough: true }) res: Response) {
    const token = this.tokenService.createToken(userId);
    res.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 dzien
    });
    res.cookie('is-logged', true, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 dzien
    });
  }
  @Post('logout')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('is-logged');
  }
}
