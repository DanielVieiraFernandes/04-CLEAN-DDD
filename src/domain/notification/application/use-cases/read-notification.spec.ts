import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { ReadNotificationUseCase } from "./read-notification";
import { MakeNotification } from "test/factories/make-notification";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
        sut = new ReadNotificationUseCase(inMemoryNotificationsRepository) // system under test
    });

    it('Should be able to read a notification', async () => {

        const notification = MakeNotification();

        await inMemoryNotificationsRepository.create(notification);

        const result = await sut.execute({
            recipientId: notification.recipientId.toString(),
            notificationId: notification.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(expect.any(Date));
    });

    it('Should not be able to read a notification from another user', async () => {

        const notification = MakeNotification({
            recipientId: new UniqueEntityID('recipient-1')
        });

        await inMemoryNotificationsRepository.create(notification);

        const result = await sut.execute({
            recipientId: 'recipient-2',
            notificationId: notification.id.toString()
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
})
