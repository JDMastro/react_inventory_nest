import { Test, TestingModule } from '@nestjs/testing';
import { ClassificationKindMovementController } from './classificationkindmovement.controller';

describe('ClassificationKindMovementController', () => {
  let controller: ClassificationKindMovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassificationKindMovementController],
    }).compile();

    controller = module.get<ClassificationKindMovementController>(ClassificationKindMovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
