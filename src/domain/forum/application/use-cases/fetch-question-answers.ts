import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchQuestionAnswersUseCaseRequest {
    page: number;
    questionId: string;
}

type FetchQuestionAnswersUseCaseResponse = Either<null, {
    answers: Answer[];
}>

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

       
        return right({answers})
    }
}