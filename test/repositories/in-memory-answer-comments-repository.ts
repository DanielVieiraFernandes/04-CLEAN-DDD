import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository implements AnswerCommentsRepository {

    public items: AnswerComment[] = []


    async create(answer: AnswerComment) {
        this.items.push(answer)

        DomainEvents.dispatchEventsForAggregate(answer.id)
    }

    async findById(id: string): Promise<AnswerComment | null> {
        const answerComment = this.items.find(item => item.id.toString() === id)

        if (!answerComment) {
            return null;
        }

        return answerComment;
    }

    async delete(answerComment: AnswerComment) {
        const itemIndex = this.items.findIndex(item => item.id === answerComment.id)

        this.items.splice(itemIndex, 1);
    }
    async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
        const answerComments = this.items.filter(item => item.answerId.toString() === answerId).slice((page - 1) * 20, page * 20)

        return answerComments;
    }

}