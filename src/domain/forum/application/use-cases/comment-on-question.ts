import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { QuestionComment, QuestionCommentProps } from "../../enterprise/entities/question-comment";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CommentOnQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment;
}

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class CommentOnQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository,
        private questionCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({ authorId, content, questionId }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found');
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content,
        })

        await this.questionCommentsRepository.create(questionComment)

        return {
            questionComment
        }

    }
}