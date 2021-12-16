import { Test, TestingModule } from '@nestjs/testing';
import { kindidentityController } from './kindidentity.controller';

describe('kindidentityController', () => {
  let controller: kindidentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [kindidentityController],
    }).compile();

    controller = module.get<kindidentityController>(kindidentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
