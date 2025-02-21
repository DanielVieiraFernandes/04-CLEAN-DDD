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
    
        const {question} = await sut.execute({
            authorId: '1',
            content: 'Nova resposta',
            title: 'Conteúdo da pergunta'
        })
    
        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
    })
})
