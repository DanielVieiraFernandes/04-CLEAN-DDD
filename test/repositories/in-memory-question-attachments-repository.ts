import { QuestionAttachmentrepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachement";

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentrepository {
    public items: QuestionAttachment[] = []

    async findManyByQuestionId(questionId: string) {
        const questionAttachments = this.items.filter(item => item.questionId.toString() === questionId)

        return questionAttachments;
    }

    async deleteManyQuestionById(questionId: string) {
        const questionAttachments = this.items.filter(item => item.questionId.toString() !== questionId);

        this.items = questionAttachments;
    }

}