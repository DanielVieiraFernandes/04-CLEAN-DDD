import { Either, left, right } from "@/core/either";
import { QuestionComment, QuestionCommentProps } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError , {}>
// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class DeleteQuestionCommentUseCase {
    constructor(private questionCommentsRepository: QuestionCommentsRepository){ }

    async execute({ authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId)

        if (!questionComment) {
            return left(new ResourceNotFoundError())
        }

        if(questionComment.authorId.toString() !== authorId){
            return left(new NotAllowedError())
        }

        await this.questionCommentsRepository.delete(questionComment)

        return right({})
    }
}