import { Entity } from "../../domain/entity"
import { Uuid } from "../../domain/value-objects/uuid.vo"
import { InmemoryRepository } from "./in-memory.repository"

type StubEntityConstructor = {
    entity_id?: Uuid;
    name: string;
    price: number;
}

class StubEntity extends Entity {
    entity_id: Uuid;
    name: string;
    price: number;

    constructor(props: StubEntityConstructor) {
        super();
        this.entity_id = props.entity_id || new Uuid();
        this.name = props.name;
        this.price = props.price;
    }

    toJSON() {
        return {
            entity_id: this.entity_id.id,
            name: this.name,
            price: this.price,
        }
    }
}

class StubInMemoryRepository extends InmemoryRepository<StubEntity, Uuid> {
    getEntity(): new (...args: any[]) => StubEntity {
        return StubEntity;
    }
}

describe('InMemoryRepository unit test', () => {
    let repo: StubInMemoryRepository;

    beforeEach(() => {
        repo = new StubInMemoryRepository();
    });

    test('should insert a new entity', async () => {
        const entity = new StubEntity({
            entity_id: new Uuid(),
            name: 'Test',
            price: 100,
        });

        await repo.insert(entity);

        expect(repo.items.length).toBe(1);
        expect(repo.items[0]).toBe(entity);
    });
    test('should bulk insert entites', async () => {
        const entities = [
            new StubEntity({
                entity_id: new Uuid(),
                name: 'entity 1',
                price: 1,
            }),
            new StubEntity({
                entity_id: new Uuid(),
                name: 'entity 2',
                price: 2,
            }),
        ];

        await repo.bulkInsert(entities);

        expect(repo.items.length).toBe(2);
        expect(repo.items[0]).toBe(entities[0]);
        expect(repo.items[1]).toBe(entities[1]);
    });
})