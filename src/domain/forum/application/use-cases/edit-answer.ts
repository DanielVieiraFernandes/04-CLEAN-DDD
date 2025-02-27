import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { AnswerAttachmentrepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachement";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

interface EditAnswerUseCaseRequest {
    content: string;
    authorId: string;
    answerId: string;
    attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
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

export class EditAnswerUseCase {
    constructor(private answerRepository: AnswerRepository, private answerAttachmentrepository: AnswerAttachmentrepository) { }

    async execute({ answerId, authorId, content, attachmentsIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError());
        }


        const currentAnswerAttachments = await this.answerAttachmentrepository.findManyByAnswerId(answerId);
        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments);
        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id
            })
        })

        answerAttachmentList.update(answerAttachments)

        answer.attachment = answerAttachmentList

        answer.content = content

        await this.answerRepository.save(answer);

        return right({ answer })
    }
}