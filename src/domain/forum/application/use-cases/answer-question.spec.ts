import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository); // system under test
    })

    it('create an a question', async () => {
    
        const {answer} = await sut.execute({
            instructorId: '1',
            content: 'Nova resposta',
            questionId: '1'
        })
    
        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    })
})
