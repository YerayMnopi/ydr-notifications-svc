import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [NotificationsModule, TypeOrmModule.forRoot(),],
  controllers: [],
  providers: [],
})
export class AppModule {}
