import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswerCommentCreatedEvent } from "@/domain/forum/enterprise/entities/events/answer-comment-created-event";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository";

export class OnAnswerCommentCreated implements EventHandler {
    constructor (
        private answerCommentRepository: AnswerCommentsRepository,
        private sendNotification: SendNotificationUseCase,
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendAnswerCommentCreated.bind(this), AnswerCommentCreatedEvent.name)
    }

    private async sendAnswerCommentCreated({answerComment}: AnswerCommentCreatedEvent) {
    const answer = await this.answerCommentRepository.findById(answerComment.id.toString())
       if(answer){
        await this.sendNotification.execute({
            recipientId: answer.authorId.toString(),
            title: `Um novo comentário foi adicionado a sua resposta"`,
            content: answer.content.substring(0,20).concat("..."),
        })
       }
    }
}