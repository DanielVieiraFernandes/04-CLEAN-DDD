import { Either, left, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";


interface ReadNotificationUseCaseRequest {
    notificationId: string;
    recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
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

export class ReadNotificationUseCase {
    constructor(private notificationRepository: NotificationsRepository) { }

    async execute({ recipientId, notificationId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

        const notification = await this.notificationRepository.findById(notificationId);

        if (!notification) {
            return left(new ResourceNotFoundError());
        }

        if (recipientId !== notification.recipientId.toString()) {
            return left(new NotAllowedError());
        }

        notification.read();

        await this.notificationRepository.save(notification);

        return right({ notification });
    }
}