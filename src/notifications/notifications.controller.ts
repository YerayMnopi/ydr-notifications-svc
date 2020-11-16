import { Controller, Get, Param, UseGuards, Sse, MessageEvent } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from 'ydr-nest-common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { notificationMockFactory } from './notification.mock';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('to/:id')
    async findByUserId(@Param('id') id: string): Promise<Notification[]> {
        return this.notificationsService.findByUserId(id);
    }

    @MessagePattern('ydr-users')
    async createForNewUser(@Payload() message: any): Promise<Notification> {
        return this.notificationsService.createForNewUser(message.value);
    }

    @Sse('sse')
    sse(): Observable<MessageEvent> {
        console.log('sse');
        return interval(1000).pipe(
            map((_) => {
                return {
                    data: notificationMockFactory()
                }
            })
        );
    }
}
