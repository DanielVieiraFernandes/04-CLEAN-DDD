import { AnswerCommentsRepository } from "../repositories/answers-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {
    
}

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository){ }

    async execute({ authorId, answerCommentId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

        if (!answerComment) {
            throw new Error('Answer comment not found');
        }

        if(answerComment.authorId.toString() !== authorId){
            throw new Error('Not allowed')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return {}
    }
}