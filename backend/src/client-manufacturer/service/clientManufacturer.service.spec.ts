import { Test, TestingModule } from '@nestjs/testing';
import { ClientManufacturerService } from './clientManufacturer.service';

describe('ClientManufacturerService', () => {
  let service: ClientManufacturerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientManufacturerService],
    }).compile();

    service = module.get<ClientManufacturerService>(ClientManufacturerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
