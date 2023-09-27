import { CategorySequelizeRepository } from "@core/category/infra/db/sequelize/category-sequelize.repository";
import { CreateCategoryUseCase } from "./create-category.use-case";
import { setupSequelize } from "@core/shared/infra/testing/helpers";
import { CategoryModel } from "@core/category/infra/db/sequelize/category.model";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";

describe("CreateCategoryUseCase Integration Tests", () => {
    let useCase: CreateCategoryUseCase;
    let repository: CategorySequelizeRepository;
  
    setupSequelize({ models: [CategoryModel] });
  
    beforeEach(() => {
      repository = new CategorySequelizeRepository(CategoryModel);
      useCase = new CreateCategoryUseCase(repository);
    });
  
    it("should create a category", async () => {
      let output = await useCase.execute({ name: "test" });
      let entity = await repository.findById(new Uuid(output.id));
      expect(output).toStrictEqual({
        id: entity.category_id.id,
        name: "test",
        description: null,
        is_active: true,
        created_at: entity.created_at,
      });
  
      output = await useCase.execute({
        name: "test",
        description: "some description",
      });
      entity = await repository.findById(new Uuid(output.id));
      expect(output).toStrictEqual({
        id: entity.category_id.id,
        name: "test",
        description: "some description",
        is_active: true,
        created_at: entity.created_at,
      });
  
      output = await useCase.execute({
        name: "test",
        description: "some description",
        is_active: true,
      });
      entity = await repository.findById(new Uuid(output.id));
      expect(output).toStrictEqual({
        id: entity.category_id.id,
        name: "test",
        description: "some description",
        is_active: true,
        created_at: entity.created_at,
      });
  
      output = await useCase.execute({
        name: "test",
        description: "some description",
        is_active: false,
      });
      entity = await repository.findById(new Uuid(output.id));
      expect(output).toStrictEqual({
        id: entity.category_id.id,
        name: "test",
        description: "some description",
        is_active: false,
        created_at: entity.created_at,
      });
    });
  });