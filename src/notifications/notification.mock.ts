import { Notification } from './notification.entity';
import * as faker from 'faker';

export const notificationMockFactory = (): Notification => {
    const name = faker.name.firstName();

    return {
        id: faker.random.uuid(),
        image: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        slug: `${name}+${faker.random.number()}`,
        from: 'test',
        to: 'test',
        text: 'lorem ipsum dolor',
        readAt: null,
        link: null,
        deletedAt: new Date(), 
        setUpdatedAt: () => ''
    };
};