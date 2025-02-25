import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, {
    answer: Answer
}>

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class AnswerQuestionUseCase {

    constructor(private answersRepository: AnswerRepository) { }

    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
        });

        await this.answersRepository.create(answer);

        return right({answer})
    }
}