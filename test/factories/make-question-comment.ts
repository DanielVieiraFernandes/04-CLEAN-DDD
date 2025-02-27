import {faker} from "@faker-js/faker"
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";

export function MakeQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: UniqueEntityID){
    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return questionComment;
}