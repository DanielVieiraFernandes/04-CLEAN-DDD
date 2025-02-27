import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachements-repository";
import { MakeAnswerAttachment } from "test/factories/make-answer-attachment";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: EditAnswerUseCase;

describe('Delete answer', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository);
        sut = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentRepository) // system under test
    })

    it('should be able to edit a answer', async () => {

        const newAnswer = MakeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));


        console.log(newAnswer);

        await inMemoryAnswersRepository.create(newAnswer)

        inMemoryAnswerAttachmentRepository.items.push(
            MakeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityID('1')
            }),
            MakeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityID('2')
            }),
        )

        await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-1',
            content: 'Conteúdo-teste',
            attachmentsIds: ['1', '3']
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteúdo-teste',
        })

        expect(inMemoryAnswersRepository.items[0].attachment.currentItems).toHaveLength(2)
        expect(inMemoryAnswersRepository.items[0].attachment.currentItems).toEqual([
            expect.objectContaining({
                attachmentId: new UniqueEntityID('1'),
            }),
            expect.objectContaining({
                attachmentId: new UniqueEntityID('3'),
            })
        ])
    })

    it('should not be able to delete a answer from another user', async () => {

        const newAnswer = MakeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'));


        console.log(newAnswer);

        await inMemoryAnswersRepository.create(newAnswer)


        const result = await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-2',
            content: 'Conteúdo-teste',
            attachmentsIds: []
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
