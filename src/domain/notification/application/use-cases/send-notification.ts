import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";


export interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}

export type SendNotificationUseCaseResponse = Either<null, {
    notification: Notification;
}
>
// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class SendNotificationUseCase {
    constructor(private notificationRepository: NotificationsRepository) { }

    async execute({ recipientId, content, title }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {

        const notification = Notification.create({
            recipientId: new UniqueEntityID(recipientId),
            content,
            title
        })
        await this.notificationRepository.create(notification);

        return right({ notification })
    }
}