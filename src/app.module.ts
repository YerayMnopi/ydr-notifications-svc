import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YdrJwtModule } from 'ydr-nest-common';

@Module({
  imports: [
    NotificationsModule,
    TypeOrmModule.forRoot(),
    YdrJwtModule
  ],
})
export class AppModule {}
