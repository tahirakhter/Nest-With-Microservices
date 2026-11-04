import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const appService = {
    getHello: jest.fn().mockReturnValue('Hello World!'),
    createItem: jest.fn(),
    getItemById: jest.fn(),
    createItemEvent: jest.fn(),
    getItemByIdEvent: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should delegate item creation to the service', () => {
      const itemDto = { name: 'Example item' };
      appController.create(itemDto);
      expect(appService.createItem).toHaveBeenCalledWith(itemDto);
    });

    it('should delegate item lookup to the service', () => {
      appController.getById(7);
      expect(appService.getItemById).toHaveBeenCalledWith(7);
    });

    it('should delegate event-based item creation to the service', () => {
      const itemDto = { name: 'Example item' };
      appController.createItemEvent(itemDto);
      expect(appService.createItemEvent).toHaveBeenCalledWith(itemDto);
    });

    it('should delegate event-based item lookup to the service', () => {
      appController.getItemByIdEvent(7);
      expect(appService.getItemByIdEvent).toHaveBeenCalledWith(7);
    });
  });
});
