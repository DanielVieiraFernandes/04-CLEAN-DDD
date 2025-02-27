import {faker} from "@faker-js/faker"

import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export function MakeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID){
    const answer = Answer.create({
        authorId: new UniqueEntityID(),
        content: faker.lorem.text(),
        questionId: new UniqueEntityID(),
        ...override
    }, id)

    return answer;
}