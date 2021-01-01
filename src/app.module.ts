import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YdrJwtModule, ormConfig } from 'ydr-nest-common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(ormConfig),
    YdrJwtModule,
    NotificationsModule,
  ],
})
export class AppModule {}
