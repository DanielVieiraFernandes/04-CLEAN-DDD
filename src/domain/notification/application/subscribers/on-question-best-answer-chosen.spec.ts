import { MakeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachements-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository";
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { MakeQuestion } from "test/factories/make-question";
import { MockInstance } from "vitest";
import { waitFor } from "test/utils/wait-for";
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen";

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionsrepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sendNotificationUseCase: SendNotificationUseCase;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

let sendNotificationExecuteSpy: MockInstance<
  (request: SendNotificationUseCaseRequest) => Promise<SendNotificationUseCaseResponse>
>;

describe('On Question Best Answer Chosen', () => {

    beforeEach(() => {
        inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryQuestionsrepository = new InMemoryQuestionsRepository(inMemoryQuestionsAttachmentsRepository);
        inMemoryAnswersAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentRepository);
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
        sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository);

        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

        new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotificationUseCase);
    })

    it('should send a notification when question has new best answer chosen', async () => {
        const question = MakeQuestion();
        const answer = MakeAnswer({
            questionId: question.id
        })

        await inMemoryQuestionsrepository.create(question);
        await inMemoryAnswersRepository.create(answer);

        question.bestAnswerId = answer.id;

        inMemoryQuestionsrepository.save(question);

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled();
        })
    })
})