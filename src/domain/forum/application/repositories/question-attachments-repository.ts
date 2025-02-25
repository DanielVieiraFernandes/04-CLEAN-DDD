import { QuestionAttachment } from "../../enterprise/entities/question-attachement";

export interface QuestionAttachmentrepository {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}