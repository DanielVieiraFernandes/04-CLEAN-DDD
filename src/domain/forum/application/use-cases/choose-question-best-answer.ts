import { Question } from "../../enterprise/entities/question";
import { AnswerRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
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

export class ChooseQuestionBestAnswerUseCase {
    constructor(private answerRepository: AnswerRepository, private questionRepository: QuestionsRepository) { }

    async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            throw new Error('Answer not found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toString())

        if (!question) {
            throw new Error('Question not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        question.bestAnswerId = answer.id

        console.log("Question atual => ", question)

        await this.questionRepository.save(question);

        return {
            question
        }
    }
}