import { Test, TestingModule } from '@nestjs/testing';
import { ClientManufacturerController } from './clientManufacturer.controller';

describe('ClientManufacturerController', () => {
  let controller: ClientManufacturerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientManufacturerController],
    }).compile();

    controller = module.get<ClientManufacturerController>(ClientManufacturerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
