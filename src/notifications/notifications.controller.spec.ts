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
        providers: [NotificationsService],
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
});
