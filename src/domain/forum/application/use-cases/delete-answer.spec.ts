import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository) // system under test
    })

    it('should be able to get a answer by slug', async () => {

        const newAnswer = MakeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));


        console.log(newAnswer);

        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: 'answer-1',
            authorId: 'author-1'
        })

        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a answer from another user', async () => {

        const newAnswer = MakeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));


        console.log(newAnswer);

        await inMemoryAnswersRepository.create(newAnswer)


        await expect(() => sut.execute({
            answerId: 'answer-1',
            authorId: 'author-2'
        })).rejects.toBeInstanceOf(Error)

    })
})
