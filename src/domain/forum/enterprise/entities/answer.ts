import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/types/optional";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AnswerAttachmentList } from "./answer-attachment-list";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { AnswerCreatedEvent } from "./events/answer-created-event";

export interface AnswerProps {
    content: string,
    authorId: UniqueEntityID;
    questionId: UniqueEntityID;
    attachments: AnswerAttachmentList;
    createdAt: Date;
    updatedAt?: Date;
}

export class Answer extends AggregateRoot<AnswerProps> {

    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
    }

    get content() {
        return this.props.content
    }

    get attachment(){
        return this.props.attachments
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get excerpt() {
        return this.content.substring(0,120).trimEnd().concat('...')
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set attachment(attachments: AnswerAttachmentList){
        this.props.attachments = attachments;
        this.touch();
    }

    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityID) {
        const answer = new Answer({
            ...props,
            attachments: props.attachments ?? new AnswerAttachmentList(),
            createdAt: new Date()
        }, id)

        const isNewAnswer = !id;

        if(isNewAnswer){
            answer.addDomainEvent(new AnswerCreatedEvent(answer));
        }

        return answer;
    }

}