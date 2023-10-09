import { ListCategoriesInput } from '@core/category/application/use-cases/list-category/list-categories.use-case';

export class SearchCategoriesDto implements ListCategoriesInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_direction?: string;
  filter?: string;
}
