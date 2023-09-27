import { Category } from "@core/category/domain/category.entity";
import { ICategoryRepository } from "@core/category/domain/category.repository";
import { IUseCase } from "@core/shared/application/use-case.interface";
import { NotFoundError } from "@core/shared/domain/errors/not-found.error";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";

export class GetCategoryUseCase
    implements IUseCase<GetCategoryInput, GetCategoryOutput> {
    constructor(private categoryRepositoy: ICategoryRepository) { }

    async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepositoy.findById(uuid);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        return CategoryOutputMapper.toOutput(category);
    }
}

export type GetCategoryInput = {
    id: string;
};

export type GetCategoryOutput = CategoryOutput;