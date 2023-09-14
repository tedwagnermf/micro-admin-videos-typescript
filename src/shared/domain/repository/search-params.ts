import { ValueObject } from "../value-objects/value-object";

export type SortDirection = 'asc' | 'desc';

export type SearchParamsConstructProps<Filter = string> = {
    page?: number;
    per_page?: number;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: Filter | null;
}

export class SearchParams<Filter = string> extends ValueObject {
    protected _page: number;
    protected _per_page: number = 15;
    protected _sort: string | null;
    protected _sort_dir: SortDirection | null;
    protected _filter: Filter | null;

    constructor(props: SearchParamsConstructProps<Filter> = {}) {
        super();
        this.page = props.page;
        this.per_page = props.per_page;
        this.sort = props.sort;
        this.sort_dir = props.sort_dir;
        this.filter = props.filter;
    }

    get page(): number {
        return this._page;
    }

    private set page(page: number) {
        let _page = +page;

        if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
            _page = 1;
        }

        this._page = _page;
    }

    get per_page(): number {
        return this._per_page;
    }

    private set per_page(per_page: number) {
        let _per_page = per_page === (true as any) ? this.per_page: +per_page;

        if (Number.isNaN(per_page) || per_page <= 0 || parseInt(per_page as any) !== per_page) {
            per_page = 1;
        }

        this.per_page = per_page;
    }

    get sort(): string {
        return this._sort;
    }

    private set sort(sort: string | null) {
        this._sort = sort === null || sort === undefined || sort === '' ? null : `${sort}`   
    }

    get sort_dir(): SortDirection {
        return this._sort_dir;
    }

    private set sort_dir(sort_dir: SortDirection | null) {
        if (! this.sort) {
            this._sort_dir = null;
            return;
        }
        const dir =  `${sort_dir}`.toLowerCase();
        this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
    }

    get filter(): Filter | null {
        return this._filter;
    }

    protected set filter(filter: Filter | null) {
        this._filter = 
        filter === null || filter === undefined || (filter as unknown) === ''
        ? null
        : ( `${filter}` as any);
    }
}