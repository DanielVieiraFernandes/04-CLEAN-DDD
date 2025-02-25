import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository) // system under test
    })

    it('create an a question', async () => {
    
        const result = await sut.execute({
            authorId: '1',
            content: 'Nova resposta',
            title: 'Conteúdo da pergunta',
            attachmentsIds: ['1', '2']
        })
    
        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
        expect(inMemoryQuestionsRepository.items[0].attachment.currentItems).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachment.currentItems).toEqual([
            expect.objectContaining({
                attachmentId: new UniqueEntityID('1'),
            }),
            expect.objectContaining({
                attachmentId: new UniqueEntityID('2'),
            })
        ])
    })
})
