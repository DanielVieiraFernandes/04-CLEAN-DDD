import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { MakeAnswerComment } from "test/factories/make-answer-comment";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete answer comment', () => {

    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
        sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
    })

    it('should be able to delete a answer comment', async () => {

        const answerComment = MakeAnswerComment();

        await inMemoryAnswerCommentsRepository.create(answerComment);

        await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: answerComment.authorId.toString(),
        })

        expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
    })

    it('should be able to delete a answer comment', async () => {

        const answerComment = MakeAnswerComment({
            authorId: new UniqueEntityID('author-1')
        });

        await inMemoryAnswerCommentsRepository.create(answerComment);


        const result = await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: 'author-2',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)

    })

})
