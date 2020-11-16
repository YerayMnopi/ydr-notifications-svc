import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'ydr-nest-common';

@Injectable()
export class NotificationsService {

    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>
    ) {}
    
    async findByUserId(id: string): Promise<Notification[] | undefined> {
        return this.notificationsRepository.find({where: {to: id}});
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
}
