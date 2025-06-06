export interface PaginationResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}