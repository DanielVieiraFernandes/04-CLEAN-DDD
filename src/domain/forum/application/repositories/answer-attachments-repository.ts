import { AnswerAttachment } from "../../enterprise/entities/answer-attachement";

export interface AnswerAttachmentrepository {
    findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
    deleteManyAnswerById(answerId: string): Promise<void>
}