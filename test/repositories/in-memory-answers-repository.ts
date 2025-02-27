import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentrepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
    

    public items: Answer[] = []
    constructor(private answerAttachmentsrepository: AnswerAttachmentrepository){}


    async findManyByQuestionId(questionId: string, {page}: PaginationParams): Promise<Answer[]> {
        const answers = this.items.filter(item => item.questionId.toString() === questionId).slice((page - 1) * 20, page * 20)

        return answers;
    }

    async delete(answer: Answer) {
        const itemIndex = this.items.findIndex(item => item.id === answer.id)

        this.items.splice(itemIndex, 1);
        this.answerAttachmentsrepository.deleteManyAnswerById(answer.id.toString());
    }

    async findById(id: string) {
        const answer = this.items.find(item => item.id.toString() === id)

        if (!answer) {
            return null;
        }

        return answer;
    }

    async create(answer: Answer): Promise<void> {
        this.items.push(answer)

        DomainEvents.dispatchEventsForAggregate(answer.id)
    }

    async save(answer: Answer) {
        const itemIndex = this.items.findIndex(item => item.id === answer.id)

        this.items[itemIndex] = answer
    }
}