import { Injectable } from '@nestjs/common';
import { Repository, MoreThan } from 'typeorm';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'ydr-nest-common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {

    /**
     * The window of time for sending user notifications
     */
    newestInterval = 1000 * 60 * parseInt(this.configService.get('SEND_NEW_NOTIFICATIONS_INTERVAL', '1'), 10)

    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>,
        private readonly configService: ConfigService
    ) {}
    
    async findByUserId(id: string): Promise<Notification[] | undefined> {
        return this.notificationsRepository.find({where: {to: id}});
    }
    
    async findNewestByUserId(id: string): Promise<Notification[] | undefined> {
        return this.notificationsRepository.find({where: {to: id, createdAt: MoreThan(this.getNewestAgoDate())}});
    }

    async createForNewUser(user: any): Promise<Notification> {
        return this.notificationsRepository.save({
            image: 'https://unsplash.com/photos/GiUJ02Yj_io',
            createdAt: new Date(),
            updatedAt: new Date(),
            name: 'Welcome to new user',
            slug: slugify('Welcome to new user' + user.id),
            from: null,
            to: user.id,
            text: `Welcome ${user.name}. Please make yourself comfortable. When you have a moment, check your email to validate your account. Enjoy the app!`,
            readAt: null,
            link: null,
        })
    }

    /**
     * Calculates the Date of the interval set for considering a notification as new.
     */
    private getNewestAgoDate(): Date {
        return new Date(Date.now() - this.newestInterval);
    }
}
