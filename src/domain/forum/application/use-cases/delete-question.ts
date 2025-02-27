import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteQuestionUseCaseRequest {
    questionId: string;
    authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError , {}>

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class DeleteQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository){}

    async execute({questionId, authorId}:DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse>{
        const question = await this.questionRepository.findById(questionId);

        if(!question){
            return left(new ResourceNotFoundError());
        }

        if(authorId !== question.authorId.toString()){
            return left(new NotAllowedError());
        }

        await this.questionRepository.delete(question)

        return right({})
    }
}