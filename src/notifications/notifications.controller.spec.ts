import { NotificationsController } from './notifications.controller';
jest.mock('./notifications.service');
import { Test } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [NotificationsController],
        providers: [
          {
            provide: NotificationsService, 
            useFactory: jest.fn(() => {
              return {
                  findByUserId: jest.fn(),
                  createForNewUser: jest.fn(),
              };
            })}
        ],
      }).compile();

    notificationsService = moduleRef.get<NotificationsService>(NotificationsService);
    notificationsController = moduleRef.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(notificationsController).toBeDefined();
  });

  describe('findByUserId', () => {
    it('should return an array of notifications', async () => {
      const result = [];
      const fakeId = 'test';
      const spy = jest.spyOn(notificationsService, 'findByUserId').mockImplementation(async() => result);
      await notificationsController.findByUserId(fakeId);

      expect(spy).toHaveBeenCalledWith(fakeId);
    });
  });

  describe('createForNewUser', () => {
    it('should create a notification for a new user', async () => {
      const message = {
        value: {}
      };
      await notificationsController.createForNewUser(message);

      expect(notificationsService.createForNewUser).toHaveBeenCalledWith(message.value);
    });
  });
});
