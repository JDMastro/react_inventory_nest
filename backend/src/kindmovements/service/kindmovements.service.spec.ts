import { Test, TestingModule } from '@nestjs/testing';
import { kindmovementsService } from './kindmovements.service';

describe('kindmovementsService', () => {
  let service: kindmovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [kindmovementsService],
    }).compile();

    service = module.get<kindmovementsService>(kindmovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
