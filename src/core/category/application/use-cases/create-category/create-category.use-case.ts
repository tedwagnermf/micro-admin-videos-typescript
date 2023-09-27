import { IUseCase } from "@core/shared/application/use-case.interface";
import { CreateCategoryInput } from "./create-category.input";
import { ICategoryRepository } from "@core/category/domain/category.repository";
import { Category } from "@core/category/domain/category.entity";
import { EntityValidationError } from "@core/shared/domain/validators/validation.error";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input);

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }

    await this.categoryRepo.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type CreateCategoryOutput = CategoryOutput;