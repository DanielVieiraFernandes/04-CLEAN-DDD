import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { QuestionAttachmentrepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { QuestionAttachment } from "../../enterprise/entities/question-attachement";

interface EditQuestionUseCaseRequest {
    title: string;
    content: string;
    authorId: string;
    questionId: string;
    attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question;
}
>
// DRY - Don't repeat yourself
/**
 * não quer dizer que você não possa repetir código
 * mas é importante analisar as circunstâncias e avaliar até onde é possível essa implementação
 * se é escalável
 * se não vai precisar separar responsabilidades dentro da aplicação
 * ...
 */

export class EditQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository, private questionAttachmentRepository: QuestionAttachmentrepository) { }

    async execute({ questionId, authorId, content, title, attachmentsIds }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(questionId);
        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments);
        const questionAttachments = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id
            })
        })

        questionAttachmentList.update(questionAttachments)

        question.attachment = questionAttachmentList
        question.title = title
        question.content = content

        await this.questionRepository.save(question);

        return right({ question })
    }
}