import { CategoryFilter, CategorySearchParams, CategorySearchResult, ICategoryRepository } from "@core/category/domain/category.repository";
import { PaginationOutput, PaginationOutputMapper } from "@core/shared/application/pagination-output";
import { IUseCase } from "@core/shared/application/use-case.interface";
import { SortDirection } from "@core/shared/domain/repository/search-params";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";

export class ListCategoriesUseCase
    implements IUseCase<ListCategoriesInput, ListCategoriesOutput> {

    constructor(private categoryRepository: ICategoryRepository) { }

    async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
        const params = new CategorySearchParams(input);
        const searchResult = await this.categoryRepository.search(params);
        return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
        const { items: _items } = searchResult;
        const items = _items.map((i) => {
            return CategoryOutputMapper.toOutput(i);
        });
        return PaginationOutputMapper.toOutput(items, searchResult);
    }
}

export type ListCategoriesInput = {
    page?: number;
    per_page?: number;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: CategoryFilter | null;
};

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;