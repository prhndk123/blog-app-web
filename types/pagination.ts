export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
