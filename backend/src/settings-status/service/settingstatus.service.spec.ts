import { Test, TestingModule } from '@nestjs/testing';
import { SettingStatusService } from './settingstatus.service';

describe('SettingStatusService', () => {
  let service: SettingStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingStatusService],
    }).compile();

    service = module.get<SettingStatusService>(SettingStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
