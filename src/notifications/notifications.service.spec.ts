import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { Repository, MoreThan } from 'typeorm';
import { Notification } from './notification.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'ydr-nest-common';
import { notificationMockFactory } from './notification.mock';
import { ConfigService } from '@nestjs/config';

// TODO: error while trying to import this function from artifact
export const repositoryMockFactory: <T>() => MockType<Partial<Repository<T>>> = jest.fn(() => {
  return {
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      save: jest.fn(),
      create: jest.fn()
  };
});


describe('NotificationsService', () => {
  let service: NotificationsService;
  let repository: MockType<Repository<Notification>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: getRepositoryToken(Notification), useFactory: repositoryMockFactory },
        {
          provide: ConfigService,
          useValue: {get: (key:string) => 1}
        }
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    repository = module.get(getRepositoryToken(Notification));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByUserId', () => {
    it('should find notifications by user id', async() => {
      const notification: Notification = notificationMockFactory();
      
      await service.findByUserId(notification.to);

      expect(repository.find).toHaveBeenCalledWith( {where: {to: notification.to}});
    });
  });

  describe('findNewestByUserId', () => {
    it('should return the notifications  created in the newest interval by user id', async() => {
      const notification: Notification = notificationMockFactory();
      
      await service.findNewestByUserId(notification.to);

      expect(repository.find).toHaveBeenCalledWith(
        {where: {to: notification.to, createdAt: MoreThan(service['getNewestAgoDate']())}}
      );
    });
  });

  describe('createForNewUser', () => {
    it('should create a notifications for a new user id', async() => {
      const user = {
        name: 'john',
        id: 'test'
      };
      
      await service.createForNewUser(user);

      expect(repository.save).toHaveBeenCalled();
    });
  });
});
