import { Controller, Get, Param, UseGuards, Sse, MessageEvent, Req, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard, RedisCacheService } from 'ydr-nest-common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable, interval, from } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { Request } from 'express';

@Controller('notifications')
export class NotificationsController {
    private readonly logger = new Logger(NotificationsController.name);

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly redisService: RedisCacheService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('to/me')
    async findByUserToken(@Req() request: Request): Promise<Notification[]> {
        this.redisService.set(request.user['id'], 'true');
        this.logger.log(`Getting user ${request.user['id']}`);
        return this.notificationsService.findByUserId(request.user['id']);
    }

    @UseGuards(JwtAuthGuard)
    @Get('to/:id')
    async findByUserId(@Param('id') userId: string): Promise<Notification[]> {
        return this.notificationsService.findByUserId(userId);
    }

    @MessagePattern('ydr-users')
    async createForNewUser(@Payload() message: any): Promise<Notification> {
        return this.notificationsService.createForNewUser(message.value);
    }

    @Sse('to/:id/subscribe')
    sendNewestToUser(@Param('id') userId: string): Observable<MessageEvent> {
        if (!this.redisService.get(userId)) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        this.logger.log(`Subscribing user ${userId}`);
        return interval(this.notificationsService.newestInterval).pipe(
            tap(() => this.logger.log(`Checking new user ${userId} notifications`)),
            switchMap(event => 
                from(this.notificationsService.findNewestByUserId(userId)).pipe(
                    filter((notifications: Notification[]) => !!notifications.length),
                    map((notifications: Notification[]) => {
                        this.logger.log(`User ${userId} has new ${notifications.length} notifications`);
                        this.logger.log(notifications);
                        return {
                            data: notifications
                        }
                    })
                )
            )
        );
    }
}
