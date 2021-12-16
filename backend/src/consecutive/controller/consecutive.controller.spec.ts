import { Test, TestingModule } from '@nestjs/testing';
import { ConsecutiveController } from './consecutive.controller';

describe('ConsecutiveController', () => {
  let controller: ConsecutiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsecutiveController],
    }).compile();

    controller = module.get<ConsecutiveController>(ConsecutiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
