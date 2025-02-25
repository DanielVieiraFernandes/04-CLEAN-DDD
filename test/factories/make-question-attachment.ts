import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id";
import { QuestionAttachment,QuestionAttachmentProps  } from "@/domain/forum/enterprise/entities/question-attachement";

export function MakeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}, id?: UniqueEntityID){
    const questionAttachment = QuestionAttachment.create({
        questionId: new UniqueEntityID(),
        attachmentId: new UniqueEntityID(),
        ...override
    }, id)

    return questionAttachment;
}