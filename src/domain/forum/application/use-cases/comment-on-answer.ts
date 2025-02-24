import { Answer } from "../../enterprise/entities/answer";
import { AnswerComment,AnswerCommentProps  } from "../../enterprise/entities/answer-comment";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { AnswerCommentsRepository } from "../repositories/answers-comments-repository";
import { AnswerRepository } from "../repositories/answers-repository";

interface CommentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment;
}

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class CommentOnAnswerUseCase {
    constructor(private answerRepository: AnswerRepository,
        private answerCommentsRepository: AnswerCommentsRepository
    ) { }

    async execute({ authorId, content, answerId }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found');
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            answerId: new UniqueEntityID(answerId),
            content,
        })

        await this.answerCommentsRepository.create(answerComment)

        return {
            answerComment
        }

    }
}