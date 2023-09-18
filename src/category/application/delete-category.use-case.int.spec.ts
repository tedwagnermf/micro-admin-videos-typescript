import { NotFoundError } from "../../shared/domain/errors/not-found.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { setupSequelize } from "../../shared/infra/testing/helpers";
import { Category } from "../domain/category.entity";
import { CategoryInMemoryRepository } from "../infra/db/in-memory/category-in-memory.repository";
import { CategorySequelizeRepository } from "../infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "../infra/db/sequelize/category.model";
import { DeleteCategoryUseCase } from "./delete-category.use-case";
import { UpdateCategoryUseCase } from "./update-category.use-case";

describe("DeleteCategoryUseCase Integrations Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const uuid = new Uuid();
    await expect(() => useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid.id, Category)
    );
  });

  it('should delete entity', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category)
    await useCase.execute({
      id: category.category_id.id,
    });
    await expect(repository.findById(category.category_id)).resolves.toBeNull();
  });
})