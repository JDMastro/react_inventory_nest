import { Test, TestingModule } from '@nestjs/testing';
import { ConsecutiveService } from './consecutive.service';

describe('ConsecutiveService', () => {
  let service: ConsecutiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsecutiveService],
    }).compile();

    service = module.get<ConsecutiveService>(ConsecutiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
