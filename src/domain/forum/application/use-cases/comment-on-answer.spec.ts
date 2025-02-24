import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comments-repository"; 
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
    })

    it('should be able to comment on answer', async () => {

        const answer = MakeAnswer();

        await inMemoryAnswersRepository.create(answer);

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: 'Comentário teste'
        })

        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('Comentário teste')
    })

})
