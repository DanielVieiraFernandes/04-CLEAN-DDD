import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachment,AnswerAttachmentProps  } from "@/domain/forum/enterprise/entities/answer-attachement";

export function MakeAnswerAttachment(override: Partial<AnswerAttachmentProps> = {}, id?: UniqueEntityID){
    const answerAttachment = AnswerAttachment.create({
        answerId: new UniqueEntityID(),
        attachmentId: new UniqueEntityID(),
        ...override
    }, id)

    return answerAttachment;
}