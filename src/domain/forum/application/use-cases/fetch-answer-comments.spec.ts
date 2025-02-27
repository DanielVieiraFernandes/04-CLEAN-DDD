import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { MakeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comments-repository";
import { MakeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch answer comments', () => {

    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository) // system under test
    })

    it('Should be able to fetch answer comments', async () => {

       await inMemoryAnswerCommentRepository.create(
        MakeAnswerComment({
            answerId: new UniqueEntityID('answer-01')
        })
       )
       await inMemoryAnswerCommentRepository.create(
        MakeAnswerComment({
            answerId: new UniqueEntityID('answer-01')
        })
       )
       await inMemoryAnswerCommentRepository.create(
        MakeAnswerComment({
            answerId: new UniqueEntityID('answer-01')
        })
       )

      const result = await sut.execute({
        answerId: 'answer-01',
        page: 1
       })

        expect(result.value?.answerComments).toHaveLength(3)
    })

    it('Should be able to fetch paginated answer comments', async () => {

        for (let i = 1; i <= 22; i++){
            await inMemoryAnswerCommentRepository.create(MakeAnswerComment({
                answerId: new UniqueEntityID('answer-01')
            }))
        }

        const result = await sut.execute({page: 2, answerId: 'answer-01'})

        expect(result.value?.answerComments).toHaveLength(2);
    })
})
