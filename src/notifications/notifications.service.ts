import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>
    ) {}

    async findByUserId(id: string): Promise<Notification[] | undefined> {
        return this.notificationsRepository.find({where: {to: id}});
    }
}
