import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
    content: string;
    authorId: string;
    answerId: string;
}

interface EditAnswerUseCaseResponse {
    answer: Answer
}

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
            throw new Error("Answer not found")
        }

        if(authorId !== answer.authorId.toString()){
            console.log(authorId, answer.authorId.toString())
            throw new Error('Not Allowed')
        }

        answer.content = content

        await this.answerRepository.save(answer);

        return {
            answer
        }
    }
}