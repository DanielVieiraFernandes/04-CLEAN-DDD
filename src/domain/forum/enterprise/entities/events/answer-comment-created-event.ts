import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { AnswerComment } from "../answer-comment";

export class AnswerCommentCreatedEvent implements DomainEvent {
    public ocurredAt: Date;
    public answerComment: AnswerComment;

    constructor(answerComment: AnswerComment){
        this.answerComment = answerComment;
        this.ocurredAt = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.answerComment.id
    }

}