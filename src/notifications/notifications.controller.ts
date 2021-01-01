import { Controller, Get, Param, UseGuards, Sse, MessageEvent, Req, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard, RedisCacheService } from 'ydr-nest-common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable, interval, from } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Request } from 'express';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly redisService: RedisCacheService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('to/:id')
    async findByUserId(@Param('id') userId: string): Promise<Notification[]> {
        return this.notificationsService.findByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('to/me')
    async findByUserToken(@Req() request: Request): Promise<Notification[]> {
        this.redisService.set(request.user['id'], 'true');
        return this.notificationsService.findByUserId(request.user['id']);
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

        return interval(this.notificationsService.newestInterval).pipe(
            switchMap(event => 
                from(this.notificationsService.findNewestByUserId(userId)).pipe(
                    filter((notifications: Notification[]) => !!notifications),
                    map((notifications: Notification[]) => {
                        return {
                            data: notifications
                        }
                    })
                )
            )
        );
    }
}
