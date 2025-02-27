import { Slug } from "./value-objects/slug";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { QuestionAttachment } from "./question-attachement";
import { QuestionAttachmentList } from "./question-attachment-list";
import { QuestionBestAnswerChosenEvent } from "./events/question-best-answer-chosen-event";

export interface QuestionProps {
    title: string;
    content: string;
    authorId: UniqueEntityID;
    attachments: QuestionAttachmentList;
    slug: Slug;
    bestAnswerId?: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {

    get authorId() {
        return this.props.authorId;
    }

    get slug() {
        return this.props.slug;
    }

    get title() {
        return this.props.title;

    }

    get bestAnswerId(): UniqueEntityID | undefined {
        return this.props.bestAnswerId
    }

    get content() {
        return this.props.content;
    }

    get attachment() {
        return this.props.attachments
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'days') <= 3;
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...');
    }

    set attachment(attachements: QuestionAttachmentList) {
        this.props.attachments = attachements
        this.touch();
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    set title(title: string) {
        this.props.title = title;
        this.props.slug = Slug.createFromText(title);
        this.touch();
    }

    set bestAnswerId(bestAnswerId: UniqueEntityID) {
        if (bestAnswerId == undefined) {
            return;
        }

        if (this.props.bestAnswerId === undefined || !this.props.bestAnswerId.equals(bestAnswerId)) {
            this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
        }

        this.props.bestAnswerId = bestAnswerId;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }


    static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityID) {
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: props.createdAt ?? new Date(),
            attachments: props.attachments ?? new QuestionAttachmentList(),
        }, id)

        return question;
    }
}
