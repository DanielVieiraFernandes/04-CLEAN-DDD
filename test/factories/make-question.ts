import {faker} from "@faker-js/faker"

import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export function MakeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID){
    const question = Question.create({
        title: faker.lorem.sentence(),
        slug: Slug.create('example-question'),
        authorId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return question;
}