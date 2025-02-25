import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answers-comments-repository";

interface FetchAnswerCommentsUseCaseRequest {
    page: number;
    answerId: string;
}

type FetchAnswerCommentsUseCaseResponse = Either<null,{
    answerComments: AnswerComment[];
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

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

    async execute({ answerId, page }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
        const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId
            , { page });


        return right({answerComments})
    }
}