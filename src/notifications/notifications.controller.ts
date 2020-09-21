import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) {}

    @Get('to/:id')
    async findByUserId(@Param('id') id: string): Promise<Notification[]> {
        return this.notificationsService.findByUserId(id);
    }
}
