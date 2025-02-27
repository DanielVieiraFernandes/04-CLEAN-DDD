import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchQuestionCommentsUseCaseRequest {
    page: number;
    questionId: string;
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
    questionComments: QuestionComment[];
}
>
// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

    async execute({ questionId, page }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId
            , { page });


        return right({questionComments})
    }
}