import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Delete question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository) // system under test
    })

    it('should be able to edit a question', async () => {

        const newQuestion = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));


        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-1',
            content: 'Conteúdo-teste',
            title: 'Pergunta-teste'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Pergunta-teste',
            content: 'Conteúdo-teste',
        })
    })

    it('should not be able to delete a question from another user', async () => {

        const newQuestion = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));


        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)


        await expect(() => sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-2',
            content: 'Conteúdo-teste',
            title: 'Pergunta-teste'
        })).rejects.toBeInstanceOf(Error)

    })
})
