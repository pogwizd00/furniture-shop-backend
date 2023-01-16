import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async verifyUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.prismaService.user.findFirst({
      where: { email: username },
    });
    if (!user) return undefined;
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) return undefined;
    return user;
  }
}
