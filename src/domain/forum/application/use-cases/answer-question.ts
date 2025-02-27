import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachement";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
    attachmentsIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<null, {
    answer: Answer
}>

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class AnswerQuestionUseCase {

    constructor(private answersRepository: AnswerRepository) { }

    async execute({ instructorId, questionId, content, attachmentsIds }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
        });

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id
            })
        });

        answer.attachment = new AnswerAttachmentList(answerAttachments);

        await this.answersRepository.create(answer);

        return right({ answer })
    }
}