import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { MakeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository) // system under test
    })

    it('create an a question', async () => {

        const newQuestion = MakeQuestion({
            slug: Slug.create('example-question')
        });

        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)    

        const {question} = await sut.execute({
            slug: 'example-question'
        })
    
        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
    })
})
