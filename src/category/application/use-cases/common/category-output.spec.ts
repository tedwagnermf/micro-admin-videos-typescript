import { Category } from "../../../domain/category.entity";
import { CategoryOutputMapper } from "./category-output";

describe('CategorOutputMapper Unit Tests', () => {
    it('should convert a category in input', () => {
        const entity = Category.create({
            name: 'Movie',
            description: 'some description',
            is_active: true,
        });
        const spyToJSON = jest.spyOn(entity, 'toJSON');
        const output = CategoryOutputMapper.toOutput(entity);
        expect(spyToJSON).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: entity.category_id.id,
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at: entity.created_at,
        });
    });
});