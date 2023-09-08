import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity"

describe('Category Unit Tests', () => {
    let validateSpy: any;
    beforeEach(() =>{
        validateSpy = jest.spyOn(Category, "validate");
    })
    describe('constructor', () => {
        test('should crete a category with default values', () => {
            const category = new Category({
                name: 'Movie'
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        })

        test('should crete a category with default values', () => {
            const created_at = new Date();

            const category = new Category({
                name: 'Movie',
                description: 'Movie Description',
                is_active: false,
                created_at
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie Description');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);
        })

        test('should  create a category with all values', () => {
            const category = new Category({
                name: 'Movie',
                description: 'Movie Description',
            })
            expect(category.category_id).toBeInstanceOf(Uuid);;
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie Description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        })
    })

    describe('create command', () => {
        test('should create a category', () => {
            const category = Category.create({
                name: 'Movie',
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull()
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })
        test('should create a category with description', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'some description'
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('some description')
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })
        test('should create a category with is_active', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false,
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('category_id field', () => {
        const arrange = [
            { category_id: null },
            { category_id: undefined },
            { category_id: new Uuid() }
        ];
        test.each(arrange)('id = %j', ({ category_id }) => {
            const category = new Category({
                name: "Movie",
                category_id: category_id as any,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            if(category_id instanceof Uuid) {
                expect(category.category_id).toBe(category_id);
            }
        });
    })
})
