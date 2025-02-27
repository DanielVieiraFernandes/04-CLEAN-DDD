import {faker} from "@faker-js/faker"

import { Notification, NotificationProps } from "@/domain/notification/enterprise/entities/notification";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export function MakeNotification(override: Partial<NotificationProps> = {}, id?: UniqueEntityID){
    const notification = Notification.create({
        title: faker.lorem.sentence(4),
        content: faker.lorem.sentence(10),
        recipientId: new UniqueEntityID(),
        ...override
    }, id)

    return notification;
}