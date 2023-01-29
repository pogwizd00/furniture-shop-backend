import { Test, TestingModule } from '@nestjs/testing';
import { UserFurnitureController } from './user-furniture.controller';
import { UserFurnitureService } from './user-furniture.service';

describe('UserFurnitureController', () => {
  let controller: UserFurnitureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFurnitureController],
      providers: [UserFurnitureService],
    }).compile();

    controller = module.get<UserFurnitureController>(UserFurnitureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
