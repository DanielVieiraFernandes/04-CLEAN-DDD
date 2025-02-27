import { AnswerAttachmentrepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachement";

export class InMemoryAnswerAttachmentRepository implements AnswerAttachmentrepository {
    public items: AnswerAttachment[] = []


    async findManyByAnswerId(answerId: string) {
        const answerAttachments = this.items.filter(item => item.answerId.toString() === answerId)

        return answerAttachments;
    }

    async deleteManyAnswerById(answerId: string) {
        const answerAttachments = this.items.filter(item => item.answerId.toString() !== answerId);

        this.items = answerAttachments;
    }

}