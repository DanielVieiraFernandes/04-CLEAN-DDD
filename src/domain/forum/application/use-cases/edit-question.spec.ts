import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository";
import { MakeQuestionComment } from "test/factories/make-question-comment";
import { MakeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: EditQuestionUseCase;

describe('Delete question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentRepository) // system under test
    })

    it('should be able to edit a question', async () => {

        const newQuestion = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));


        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)

        inMemoryQuestionAttachmentRepository.items.push(
            MakeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('1')
            }),
            MakeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityID('2')
            }),
        )

        await sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-1',
            content: 'Conteúdo-teste',
            title: 'Pergunta-teste',
            attachmentsIds: ['1', '3']
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Pergunta-teste',
            content: 'Conteúdo-teste',
        })
        expect(inMemoryQuestionsRepository.items[0].attachment.currentItems).toHaveLength(2)
                expect(inMemoryQuestionsRepository.items[0].attachment.currentItems).toEqual([
                    expect.objectContaining({
                        attachmentId: new UniqueEntityID('1'),
                    }),
                    expect.objectContaining({
                        attachmentId: new UniqueEntityID('3'),
                    })
                ])
    })

    it('should not be able to delete a question from another user', async () => {

        const newQuestion = MakeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'));


        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)


        const result = await sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-2',
            content: 'Conteúdo-teste',
            title: 'Pergunta-teste',
            attachmentsIds: []
        })


        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
