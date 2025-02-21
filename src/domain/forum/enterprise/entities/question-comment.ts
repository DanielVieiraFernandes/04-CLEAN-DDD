import { Optional } from "@/core/types/optional";
import { UniqueEntityID } from "./value-objects/unique-entity-id";
import { Comment, CommentProps } from "./comment";

export interface QuestionCommentProps extends CommentProps {
    questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {

    get answerId() {
        return this.props.answerId
    }

    static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID) {
        const questionComment = new QuestionComment({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return questionComment;
    }

}