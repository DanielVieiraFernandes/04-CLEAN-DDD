import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";
import { vi } from "vitest";

class CustomAggregateCreated implements DomainEvent {
    public ocurredAt: Date;
    private aggregate: CustomAggregate;

    constructor(aggregate: CustomAggregate) {
        this.ocurredAt = new Date();
        this.aggregate = aggregate;
    }

    getAggregateId(): UniqueEntityID {
        return this.aggregate.id;
    }

}

class CustomAggregate extends AggregateRoot<null> {
    static create() {
        const aggregate = new CustomAggregate(null);

        aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

        return aggregate;
    }
}

describe('domain events', () => {
    it('Should be able to dispatch and listen to events', () => {
        const callbackSpy = vi.fn()

        // Subscriber cadastrado (ouvindo o evento de resposta criada)
        DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

        //  estou criando uma resposta sem salvar no banco
        const aggregate = CustomAggregate.create();

        // Estou assegurando que o evento foi criado, porém, não foi disparado
        expect(aggregate.domainEvents).toHaveLength(1);

        //  Estou salvando a resposta no banco de dados e assim disparando o evento
        DomainEvents.dispatchEventsForAggregate(aggregate.id);

        // O subscriber ouve o evento e faz o que precisa ser feito com o dado
        expect(callbackSpy).toHaveBeenCalled();
        expect(aggregate.domainEvents).toHaveLength(0);
    })
})