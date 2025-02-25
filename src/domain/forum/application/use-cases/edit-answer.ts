import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface EditAnswerUseCaseRequest {
    content: string;
    authorId: string;
    answerId: string;
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,{
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

export class EditAnswerUseCase {
    constructor(private answerRepository: AnswerRepository){}

    async execute({answerId, authorId, content}:EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse>{
        const answer = await this.answerRepository.findById(answerId);

        if(!answer){
            return left(new ResourceNotFoundError());
        }

        if(authorId !== answer.authorId.toString()){
            return left(new NotAllowedError());
        }

        answer.content = content

        await this.answerRepository.save(answer);

        return right({answer})
    }
}