import { Either, left, right } from "@/core/either";
import { AnswerRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { Question } from "../../enterprise/entities/question";

interface DeleteAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError , {}>

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class DeleteAnswerUseCase {
    constructor(private answerRepository: AnswerRepository){}

    async execute({answerId, authorId}:DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse>{
        const answer = await this.answerRepository.findById(answerId);

        if(!answer){
            return left(new ResourceNotFoundError());
        }

        if(authorId !== answer.authorId.toString()){
            return left(new NotAllowedError());
        }

        await this.answerRepository.delete(answer)

        return right({})
    }
}