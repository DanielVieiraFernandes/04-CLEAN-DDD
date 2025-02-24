import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { MakeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments-repository";
import { MakeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch question comments', () => {

    beforeEach(() => {
        inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
        sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository) // system under test
    })

    it('Should be able to fetch question comments', async () => {

       await inMemoryQuestionCommentRepository.create(
        MakeQuestionComment({
            questionId: new UniqueEntityID('question-01')
        })
       )
       await inMemoryQuestionCommentRepository.create(
        MakeQuestionComment({
            questionId: new UniqueEntityID('question-01')
        })
       )
       await inMemoryQuestionCommentRepository.create(
        MakeQuestionComment({
            questionId: new UniqueEntityID('question-01')
        })
       )

      const {questionComments} = await sut.execute({
        questionId: 'question-01',
        page: 1
       })

        expect(questionComments).toHaveLength(3)
    })

    it('Should be able to fetch paginated question comments', async () => {

        for (let i = 1; i <= 22; i++){
            await inMemoryQuestionCommentRepository.create(MakeQuestionComment({
                questionId: new UniqueEntityID('question-01')
            }))
        }

        const {questionComments} = await sut.execute({page: 2, questionId: 'question-01'})

        expect(questionComments).toHaveLength(2);
    })
})
