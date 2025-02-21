import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question;
}

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class GetQuestionBySlugUseCase {
    constructor(private questionRepository: QuestionsRepository){}

    async execute({slug}:GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse>{
        const question = await this.questionRepository.findBySlug(slug)

        if(!question){
            throw new Error('Question not found');
        }

        return {
            question
        }
    }
}