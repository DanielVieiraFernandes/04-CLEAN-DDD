import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { MakeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachements-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch question answers', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository);
        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository) // system under test
    })

    it('Should be able to fetch question answers', async () => {

        await inMemoryAnswersRepository.create(MakeAnswer({
            questionId: new UniqueEntityID('question-1')
        }))
        await inMemoryAnswersRepository.create(MakeAnswer({
            questionId: new UniqueEntityID('question-1')
        }))
        await inMemoryAnswersRepository.create(MakeAnswer({
            questionId: new UniqueEntityID('question-1')
        }))

        const result = await sut.execute({page: 1, questionId: 'question-1'})

        expect(result.value?.answers).toHaveLength(3)
    })

    it('Should be able to fetch paginated question answers', async () => {

        for (let i = 1; i <= 22; i++){
            await inMemoryAnswersRepository.create(MakeAnswer({
                questionId: new UniqueEntityID('question-1')
            }))
        }

        const result = await sut.execute({page: 2, questionId: 'question-1'})

        expect(result.value?.answers).toHaveLength(2);
    })
})
