import { Test, TestingModule } from '@nestjs/testing';
import { SettingStatusController } from './settingstatus.controller';

describe('SettingStatusController', () => {
  let controller: SettingStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingStatusController],
    }).compile();

    controller = module.get<SettingStatusController>(SettingStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
