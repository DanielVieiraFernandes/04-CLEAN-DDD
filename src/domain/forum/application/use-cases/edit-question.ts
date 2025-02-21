import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
    title: string;
    content: string;
    authorId: string;
    questionId: string;
}

interface EditQuestionUseCaseResponse {
    question: Question;
}

// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class EditQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository){}

    async execute({questionId, authorId, content, title}:EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse>{
        const question = await this.questionRepository.findById(questionId);

        if(!question){
            throw new Error("Question not found")
        }

        if(authorId !== question.authorId.toString()){
            console.log(authorId, question.authorId.toString())
            throw new Error('Not Allowed')
        }

        question.title = title
        question.content = content

        await this.questionRepository.save(question);

        return {
            question
        }
    }
}