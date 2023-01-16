import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access-token'];
    if (!token) throw new UnauthorizedException();
    try {
      const payload = this.tokenService.verifyToken(token);
      request.userId = payload.sub;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
