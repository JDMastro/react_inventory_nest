import { Test, TestingModule } from '@nestjs/testing';
import { kindidentityService } from './kindidentity.service';

describe('kindidentityService', () => {
  let service: kindidentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [kindidentityService],
    }).compile();

    service = module.get<kindidentityService>(kindidentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
