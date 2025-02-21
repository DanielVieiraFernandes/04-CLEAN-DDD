import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/types/optional";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

export interface CommentProps {
    content: string,
    answerId: UniqueEntityID;
    authorId: UniqueEntityID;
    createdAt: Date;
    updatedAt?: Date 
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {

    get authorId() {
        return this.props.authorId
    }

    get content() {
        return this.props.content
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    private touch(){
        this.props.updatedAt = new Date()
    }

}