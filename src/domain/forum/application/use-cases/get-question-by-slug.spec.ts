import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository) // system under test
    })

    it('create an a question', async () => {

        const newQuestion = Question.create({
            title: 'Example-Question',
            slug: Slug.create('example-question'),
            authorId: new UniqueEntityID(),
            content: 'Example content'
        })

        await inMemoryQuestionsRepository.create(newQuestion)    

        const {question} = await sut.execute({
            slug: 'example-question'
        })
    
        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
    })
})
