import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
    create(questionComment: QuestionComment): Promise<void>;
    delete(questionComment: QuestionComment): Promise<void>;
    findById(id: string): Promise<QuestionComment | null>;
    findManyByQuestionId(question: string, params: PaginationParams): Promise<QuestionComment[]>;
}