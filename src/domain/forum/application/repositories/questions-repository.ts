import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";



export interface QuestionsRepository {
    create(question: Question): Promise<void>;
    findBySlug(slug: string): Promise<Question | null>;
    findById(id: string): Promise<Question | null>;
    delete(question: Question): Promise<void>;
    save(question: Question): Promise<void>;
    findManyRecent(params: PaginationParams): Promise<Question[]>
}