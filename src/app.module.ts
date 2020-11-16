import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YdrJwtModule } from 'ydr-nest-common';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from 'ydr-nest-common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(ormConfig),
    YdrJwtModule,
    NotificationsModule,
  ],
})
export class AppModule {}
