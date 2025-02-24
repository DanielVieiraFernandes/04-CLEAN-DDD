import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchQuestionAnswersUseCaseRequest {
    page: number;
    questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
    answers: Answer[];
}

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswerRepository){}

    async execute({questionId,page}:FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse>{
        const answers = await this.answersRepository.findManyByQuestionId(questionId,{page});

       
        return {
            answers
        }
    }
}