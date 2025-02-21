import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
    questionId: string;
    authorId: string;
}

interface DeleteQuestionUseCaseResponse {
}

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
            throw new Error("Question not found")
        }

        if(authorId !== question.authorId.toString()){
            console.log(authorId, question.authorId.toString())
            throw new Error('Not Allowed')
        }

        await this.questionRepository.delete(question)

        return {}
    }
}