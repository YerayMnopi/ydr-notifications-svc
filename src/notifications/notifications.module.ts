import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from 'ydr-nest-common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    ConfigModule,
    RedisCacheModule
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
