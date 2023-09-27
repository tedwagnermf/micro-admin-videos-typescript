import { ISearchableRepository } from "../../../../shared/domain/repository/repository-interface";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../domain/category.entity";

export interface ICatetoryRepository extends ISearchableRepository<Category, Uuid> {
    
}