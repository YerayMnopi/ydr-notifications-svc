import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from '../jwt-auth.guard';

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
}
