import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Delete answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new EditAnswerUseCase(inMemoryAnswersRepository) // system under test
    })

    it('should be able to edit a answer', async () => {

        const newAnswer = MakeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));


        console.log(newAnswer);

        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-1',
            content: 'Conteúdo-teste',
                })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteúdo-teste',
        })
    })

    it('should not be able to delete a answer from another user', async () => {

        const newAnswer = MakeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));


        console.log(newAnswer);

        await inMemoryAnswersRepository.create(newAnswer)


        await expect(() => sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-2',
            content: 'Conteúdo-teste',
        })).rejects.toBeInstanceOf(Error)

    })
})
