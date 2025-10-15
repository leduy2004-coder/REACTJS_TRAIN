export type ApiResponse<T> = {
  code: number;
  result: T;
  message?: string;
  status?: string | number;
};
export type PageResponse<T> = {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  data: T[];
};
