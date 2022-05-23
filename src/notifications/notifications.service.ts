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
    newestInterval = 1000 * parseInt(this.configService.get('SEND_NEW_NOTIFICATIONS_INTERVAL', '1'), 10)

    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>,
        private readonly configService: ConfigService
    ) {}
    
    async findByUserId(id: string): Promise<Notification[] | undefined> {
        const notifications = await this.notificationsRepository.find({where: {to: id}, order:{createdAt: 'DESC'}});
        this.removeNew(notifications);
        return notifications;
    }

    async removeNew(notifications: Notification[]) {
        const newNotifications = notifications
            .filter(notification => notification.new === true)
            .map(notification => ({...notification, ...{new: false}}));
        await this.notificationsRepository.save(newNotifications);
    }
    
    async findNewestByUserId(id: string): Promise<Notification[] | undefined> {
        const notifications = await this.notificationsRepository.find({where: {to: id, new: true}});
        this.removeNew(notifications);
        return notifications;
    }

    async createForNewUser(user: any): Promise<Notification> {
        return this.notificationsRepository.save({
            image: 'https://unsplash.com/photos/GiUJ02Yj_io',
            createdAt: new Date(),
            updatedAt: new Date(),
            name: 'Welcome to new user',
            slug: slugify('Welcome to new user' + user.id),
            from: null,
            new: true,
            to: user.id,
            text: `Welcome ${user.name}. Please make yourself comfortable. When you have a moment, check your email to validate your account. Enjoy the app!`,
            readAt: null,
            link: null,
        })
    }

    async createDummy(): Promise<Notification> {
        return this.notificationsRepository.save({
            image: 'https://unsplash.com/photos/GiUJ02Yj_io',
            createdAt: new Date(),
            updatedAt: new Date(),
            name: `Notification ${Math.random() * 1000}`,
            slug: slugify('W' + Math.random() * 1000),
            from: null,
            new: true,
            to: 'b91e98be-d9f4-43a9-9f6b-5d41124d5eba',
            text: 'lorem ipsum dolor',
            readAt: null,
            link: null,
        })
    }

    /**
     * Calculates the Date of the interval set for considering a notification as new.
     */
    private getNewestAgoDate(): Date {
        return new Date(Date.now() + this.newestInterval);
    }
}
