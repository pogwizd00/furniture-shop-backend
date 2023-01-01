import { HttpException, HttpStatus } from '@nestjs/common';

export class FurnituresNotFoundExceptions extends HttpException {
  constructor(error?: string) {
    super(error ?? 'Book not found', HttpStatus.NOT_FOUND);
  }
}
