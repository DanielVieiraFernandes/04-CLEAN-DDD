import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
}

interface CreateQuestionUseCaseResponse {
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

export class CreateQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository){}

    async execute({authorId,content,title}:CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse>{
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            content,
            title
        })

        await this.questionRepository.create(question);

        return {
            question,
        }
    }
}