import { NotificationsController } from './notifications.controller';
jest.mock('./notifications.service');
import { Test } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { first } from 'rxjs/operators';
import { notificationMockFactory } from './notification.mock';
import { Request } from 'express';
import { RedisCacheService } from 'ydr-nest-common';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  let notificationsService: NotificationsService;
  let redisService: RedisCacheService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [NotificationsController],
        providers: [
          {
            provide: NotificationsService, 
            useFactory: jest.fn(() => {
              return {
                  newestInterval: 1,
                  findByUserId: jest.fn(),
                  createForNewUser: jest.fn(),
                  findNewestByUserId: jest.fn()
              };
            })
          },
          {
            provide: RedisCacheService, 
            useFactory: jest.fn(() => {
              return {
                  set: jest.fn(),
                  get: jest.fn(),
              };
            })
          }
        ],
      }).compile();

    notificationsService = moduleRef.get<NotificationsService>(NotificationsService);
    notificationsController = moduleRef.get<NotificationsController>(NotificationsController);
    redisService = moduleRef.get<RedisCacheService>(RedisCacheService);

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

  describe('findByUserToken', () => {
    it('should return an array of notifications', async () => {
      const result = [];
      const fakeId = 'test';
      const mockedRequest = {user: {id: fakeId}} as unknown as Request;
      const spy = jest.spyOn(notificationsService, 'findByUserId').mockImplementation(async() => result);
      await notificationsController.findByUserToken(mockedRequest);

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

  describe('sendNewestToUser', () => {
    let result = null;
    const mockedNotification = notificationMockFactory()
    const userId = 'test';
    const expectedResult = {
      data: [mockedNotification]
    };

    beforeEach(() => {
      jest.spyOn(notificationsService, 'findNewestByUserId').mockImplementationOnce(
        () => Promise.resolve([mockedNotification])
      );
    });
  
    /*
    it('should throw unauthorized if user is not in redis', () => {
      jest.spyOn(redisService, 'get').mockImplementationOnce(
        () => Promise.resolve()
      );
    });
    */

    it('should return an observable of notifications', done => {
      jest.spyOn(redisService, 'get').mockImplementationOnce(
        () => Promise.resolve()
      );
      return notificationsController.sendNewestToUser(userId)
      .pipe(
        first()
      )
      .subscribe(
        (message) => {
          result = message;
          expect(result).toStrictEqual(expectedResult);
          done();
        }
      );
    });
  });
});
