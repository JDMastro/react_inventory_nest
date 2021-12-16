import { Test, TestingModule } from '@nestjs/testing';
import { ClassificationKindMovementService } from './classificationkindmovement.service';

describe('ClassificationKindMovementService', () => {
  let service: ClassificationKindMovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificationKindMovementService],
    }).compile();

    service = module.get<ClassificationKindMovementService>(ClassificationKindMovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
