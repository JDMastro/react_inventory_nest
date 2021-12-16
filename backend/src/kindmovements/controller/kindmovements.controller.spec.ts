import { Test, TestingModule } from '@nestjs/testing';
import { kindmovementsController } from './kindmovements.controller';

describe('kindmovementsController', () => {
  let controller: kindmovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [kindmovementsController],
    }).compile();

    controller = module.get<kindmovementsController>(kindmovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
