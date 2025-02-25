import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { MakeQuestion } from "test/factories/make-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository) // system under test
    })

    it('should be able to choose the question best answer', async () => {

        const question = MakeQuestion();

        const answer = MakeAnswer({
            questionId: question.id
        });

        await inMemoryQuestionsRepository.create(question);
        await inMemoryAnswersRepository.create(answer);


        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString()
        })

        const q =  inMemoryQuestionsRepository.items[0]
        console.log("Question do teste: ", q)


        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
    })

    it('should not be able to choose another user question best', async () => {

        const question = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        })

        const newAnswer = MakeAnswer({
            questionId: question.id
        });

        await inMemoryAnswersRepository.create(newAnswer)
        await inMemoryQuestionsRepository.create(question)

        const result = await sut.execute({
            authorId: 'author-2',
            answerId: newAnswer.id.toString()
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)


    })
})
