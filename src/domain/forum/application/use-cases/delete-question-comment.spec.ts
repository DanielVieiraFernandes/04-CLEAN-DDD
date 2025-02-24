import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { MakeQuestionComment } from "test/factories/make-question-comment";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete question comment', () => {

    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository();
        sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
    })

    it('should be able to delete a question comment', async () => {

        const questionComment = MakeQuestionComment();

        await inMemoryQuestionCommentsRepository.create(questionComment);

        await sut.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: questionComment.authorId.toString(),
        })

        expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
    })

    it('should be able to delete a question comment', async () => {

        const questionComment = MakeQuestionComment({
            authorId: new UniqueEntityID('author-1')
        });

        await inMemoryQuestionCommentsRepository.create(questionComment);


        await expect(() => sut.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: 'author-2',
        })).rejects.toBeInstanceOf(Error);

    })

})
