import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity"

describe('Category Unit Tests', () => {
    let validateSpy: any;
    beforeEach(() => {
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
            if (category_id instanceof Uuid) {
                expect(category.category_id).toBe(category_id);
            }
        });

    });
})

describe('Category Validator', () => {
    describe('create command', () => {
        it('should an invalid category with name property', () => {
            expect(() => Category.create({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => Category.create({ name: '' })).containsErrorMessages({
                name: [
                    "name should not be empty",
                ],
            });

            expect(() => Category.create({ name: 5 } as any)).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => Category.create({ name: 't'.repeat(256) })).containsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters",
                ],
            });
        });

        it('should an invalid category with description property', () => {
            expect(() => Category.create({ description: 5 } as any)).containsErrorMessages({
                description: [
                    "description must be a string",
                ],
            });
        });

        it('should an invalid category with is_active property', () => {
            expect(() => Category.create({ is_active: 5 } as any)).containsErrorMessages({
                is_active: [
                    "is_active must be a boolean value",
                ],
            });
        });
    });

    describe('changeName method', () => {
        it('should a invalid category with name property', () => {
            const category = Category.create({ name: 'name' });

            expect(() => category.changeName(null)).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName('')).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => category.changeName(5 as any)).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters",
                ],
            });
        });
    });

    describe('changeDescription  method', () => {
        it('should a invalid category with description property', () => {
            const category = Category.create({ name: 'name' });

            expect(() => category.changeDescription(5 as any)).containsErrorMessages({
                description: ["description must be a string"],
            });
        });
    });

    describe('update method', () => {
        it('should a invalid category with name property', () => {
            const category = Category.create({ name: 'name' });

            expect(() => category.update({ name: null, description: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.update({ name: '', description: null })).containsErrorMessages({
                name: ["name should not be empty"],
            });

            expect(() => category.update({ name: 5 as any, description: null })).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => category.update({ name: 't'.repeat(256), description: null })).containsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters",
                ],
            });
        });

        it('should a invalid category with description property', () => {
            const category = Category.create({ name: 'name' });

            expect(() => category.update({ name: 'name', description: 5 as any })).containsErrorMessages({
                description: [
                    "description must be a string",
                ],
            });

            expect(() => category.update({ name: 'name', description: 't'.repeat(256) })).containsErrorMessages({
                name: [
                    "description must be shorter than or equal to 255 characters",
                ],
            });
        });
    });

    describe('activate method', () => {
        it('should a invalid category when is_active is true', () => {
            const category = Category.create({ name: 'name' });

            category.activate();

            expect(category.is_active).toBeTruthy();
        });
    });

    describe('desactivate method', () => {
        it('should a invalid category when is_active is true', () => {
            const category = Category.create({ name: 'name' });

            category.deactivate();

            expect(category.is_active).toBeFalsy();
        });
    });
});
