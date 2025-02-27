import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
        sut = new SendNotificationUseCase(inMemoryNotificationsRepository) // system under test
    })

    it('Should be able to send a notification', async () => {

        const result = await sut.execute({
            recipientId: '1',
            title: 'Conteúdo da pergunta',
            content: ''
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryNotificationsRepository.items[0]).toEqual(result.value?.notification)
    })
})
 