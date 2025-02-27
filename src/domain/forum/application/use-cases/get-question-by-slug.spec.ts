import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { MakeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentRepository);
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository) // system under test
    })

    it('create an a question', async () => {

        const newQuestion = MakeQuestion({
            slug: Slug.create('example-question')
        });

        console.log(newQuestion);

        await inMemoryQuestionsRepository.create(newQuestion)    

        const result = await sut.execute({
            slug: 'example-question'
        })

        if(result.isLeft()){
            return null;
        }
    
        expect(result.value.question).toBeTruthy()
        expect(result.value.question.title).toEqual(newQuestion.title)
    })
})
