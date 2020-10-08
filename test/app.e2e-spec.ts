import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { notificationMockFactory } from '../src/notifications/notification.mock';
import { NotificationsModule } from '../src/notifications/notifications.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../src/jwt.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { YdrJwtModule } from 'ydr-nest-common';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Notification>;
  let jwtService: JwtService;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        NotificationsModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        YdrJwtModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'passwd',
          database: 'ydr_notifications_db_e2e_test',
          entities: ['src/**/*.entity.ts'],
          synchronize: true,
          keepConnectionAlive: true
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('NotificationRepository');
    jwtService = moduleFixture.get(JwtService);

  });

  describe('GET /notifications/to', () => {
    const fakeNotification = notificationMockFactory();

    beforeAll(async(done) => {
      await repository.save([
        fakeNotification,
        notificationMockFactory(),
        notificationMockFactory(),
      ]);
      done();
    });

    it('should return an array of notifications', async () => {
      const token = jwtService.sign({id: fakeNotification.id});

      const response: {body: Notification[]} = await request.agent(app.getHttpServer())
        .get(`/notifications/to/${fakeNotification.to}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body.length).toBe(3);
    });
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM notifications;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
