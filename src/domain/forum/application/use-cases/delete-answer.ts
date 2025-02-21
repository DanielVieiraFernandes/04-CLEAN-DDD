import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
    answerId: string;
    authorId: string;
}

interface DeleteAnswerUseCaseResponse {
}

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
            throw new Error("Answer not found")
        }

        if(authorId !== answer.authorId.toString()){
            console.log(authorId, answer.authorId.toString())
            throw new Error('Not Allowed')
        }

        await this.answerRepository.delete(answer)

        return {}
    }
}