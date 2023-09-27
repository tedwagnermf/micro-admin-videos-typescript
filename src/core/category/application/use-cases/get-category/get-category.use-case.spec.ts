import { NotFoundError } from '@core/shared/domain/errors/not-found.error';
import { InvalidUuidError, Uuid } from '../../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../../../domain/category.entity';
import { CategoryInMemoryRepository } from '../../../infra/db/in-memory/category-in-memory.repository';
import { GetCategoryUseCase } from './get-category.use-case';

describe('GetCategory Unit Test', () => {
    let useCase: GetCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase(repository);
    });

    it('should throws error when category not found', async () => {
        await expect(() => useCase.execute({ id: 'invalid-id' })).rejects.toThrow(
            new InvalidUuidError()
        );

        const uuid = new Uuid();
        await expect(() => useCase.execute({ id: uuid.id })).rejects.toThrow(
            new NotFoundError(uuid.id, Category)
        );
    });

    it('should returns a category', async () => {
        const items = [Category.create({name: 'Movie'})];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, 'findById');
        const output = await useCase.execute({ id: items[0].category_id.id});
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: items[0].category_id.id,
            name: 'Movie',
            description: null,
            is_active: true,
            created_at: items[0].created_at,
        })
    });
});
