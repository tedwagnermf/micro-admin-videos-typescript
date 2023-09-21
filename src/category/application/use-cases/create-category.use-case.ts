import { IUseCase } from "../../../shared/application/use-case.interface";
import { Category } from "../../domain/category.entity";
import { ICategoryRepository } from "../../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category-output";

export class CreateCategoryUseCase implements IUseCase<CreateCategoryInput, CreateCagoryOutput> {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async execute(input: CreateCategoryInput): Promise<CreateCagoryOutput> {
        const category = Category.create(input);
        
        await this.categoryRepository.insert(category);

        return CategoryOutputMapper.toOutput(category);
    }
}

export type CreateCategoryInput = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}

export type CreateCagoryOutput = CategoryOutput;


