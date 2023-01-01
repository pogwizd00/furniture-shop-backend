import { Test, TestingModule } from '@nestjs/testing';
import { FurnituresController } from './furnitures.controller';

describe('FurnituresController', () => {
  let controller: FurnituresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnituresController],
    }).compile();

    controller = module.get<FurnituresController>(FurnituresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
