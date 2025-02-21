import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
    public items: Answer[] = []

    async create(answer: Answer): Promise<void> {
        this.items.push(answer)
    }
}