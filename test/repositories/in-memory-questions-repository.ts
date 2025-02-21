import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    public items: Question[] = []

    async create(question: Question): Promise<void> {
        this.items.push(question)
    }

    async findBySlug(slug: string){
        const question = this.items.find(item => item.slug.value === slug)

        if(!question){
            return null
        }

        return question;
    }
}