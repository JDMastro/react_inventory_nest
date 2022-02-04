import { Test, TestingModule } from '@nestjs/testing';
import { ClassificationPeopleService } from './classificationPeople.service';

describe('ClassificationPeopleService', () => {
  let service: ClassificationPeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificationPeopleService],
    }).compile();

    service = module.get<ClassificationPeopleService>(ClassificationPeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
