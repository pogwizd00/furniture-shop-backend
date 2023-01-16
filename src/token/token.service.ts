import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(userId: number): string {
    // token bedzie wazny tylko jeden dzien
    return this.jwtService.sign({ sub: userId }, { expiresIn: '1 day' });
  }

  verifyToken(token: string): { sub: string } {
    return this.jwtService.verify(token);
  }
}
