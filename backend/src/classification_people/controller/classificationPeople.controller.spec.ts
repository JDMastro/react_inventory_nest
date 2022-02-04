import { Test, TestingModule } from '@nestjs/testing';
import { classificationPeopleController } from './classificationPeople.controller';

describe('classificationPeopleController', () => {
  let controller: classificationPeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [classificationPeopleController],
    }).compile();

    controller = module.get<classificationPeopleController>(classificationPeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
