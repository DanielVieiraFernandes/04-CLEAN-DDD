import { QuestionComment, QuestionCommentProps } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {
    
}

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
            throw new Error('Question comment not found');
        }

        if(questionComment.authorId.toString() !== authorId){
            throw new Error('Not allowed')
        }

        await this.questionCommentsRepository.delete(questionComment)

        return {}
    }
}