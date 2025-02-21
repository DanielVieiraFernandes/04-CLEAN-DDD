import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository) // system under test
    })

    it('should be able to get a question by slug', async () => {

        const newQuestion = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));


        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: 'question-1',
            authorId: 'author-1'
        })

        expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a question from another user', async () => {

        const newQuestion = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));


        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)


        await expect(() => sut.execute({
            questionId: 'question-1',
            authorId: 'author-2'
        })).rejects.toBeInstanceOf(Error)

    })
})
