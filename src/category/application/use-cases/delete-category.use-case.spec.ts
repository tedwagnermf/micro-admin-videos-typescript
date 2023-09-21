import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { InvalidUuidError, Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "./delete-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
    let useCase: DeleteCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase(repository);
    });

    it('should throws error when category nt found', async () => {
        await expect(() =>
            useCase.execute({ id: 'fake_id' })).
            rejects.toThrow(new InvalidUuidError());

        const uuid = new Uuid();

        await expect(() =>
            useCase.execute({ id: uuid.id })
        ).rejects.toThrow(new NotFoundError(uuid.id, Category));
    });

    it('should delete category', async () => {
        const items = [Category.fake().aCategory().withName('test 1').build()];
        repository.items = items;
        await useCase.execute({
            id: items[0].category_id.id
        });
        expect(repository.items).toHaveLength(0);
    });
});