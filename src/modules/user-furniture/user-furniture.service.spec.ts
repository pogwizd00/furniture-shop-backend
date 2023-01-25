import { Test, TestingModule } from '@nestjs/testing';
import { UserFurnitureService } from './user-furniture.service';

describe('UserFurnitureService', () => {
  let service: UserFurnitureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFurnitureService],
    }).compile();

    service = module.get<UserFurnitureService>(UserFurnitureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
