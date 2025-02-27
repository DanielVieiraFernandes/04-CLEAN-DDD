import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentrepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {

    constructor(private questionAttachmentsRepository: QuestionAttachmentrepository) { }

    public items: Question[] = []

    async findManyRecent({ page }: PaginationParams) {
        const questions = this.items.
            sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).
            slice((page - 1) * 20, page * 20)

        return questions
    }

    async create(question: Question): Promise<void> {
        this.items.push(question)

        DomainEvents.dispatchEventsForAggregate(question.id)
    }

    async findBySlug(slug: string) {
        const question = this.items.find(item => item.slug.value === slug)

        if (!question) {
            return null
        }

        return question;
    }

    async delete(question: Question) {
        const itemIndex = this.items.findIndex(item => item.id === question.id)

        this.items.splice(itemIndex, 1);

        this.questionAttachmentsRepository.deleteManyQuestionById(question.id.toString());
    }

    async findById(id: string) {
        const question = this.items.find(item => item.id.toString() === id)

        if (!question) {
            return null;
        }

        return question;
    }
    async save(question: Question) {

        console.log("Question do save: ", question);

        const itemIndex = this.items.findIndex(item => item.id === question.id);

        this.items[itemIndex] = question;

        DomainEvents.dispatchEventsForAggregate(question.id)
    }
}