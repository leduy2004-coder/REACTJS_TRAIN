import * as callPath from "@/Utils/httpRequest";
import type { ApiResponse } from "@/Models/Response";
import type {
  CategoryCreateRequest,
  CategoriesResponse,
} from "@/Models/Category";

/**
 * Create category with optional image
 */
export const createCategoryAPI = async (
  request: CategoryCreateRequest,
  file?: File,
): Promise<ApiResponse<CategoriesResponse>> => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);
  if (file) formData.append("file", file);

  const res = await callPath.post<ApiResponse<CategoriesResponse>>(
    "product/categories/create",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data;
};

/**
 * Get all categories
 */
export const getAllCategoriesAPI = async (): Promise<
  ApiResponse<CategoriesResponse[]>
> => {
  const res = await callPath.get<ApiResponse<CategoriesResponse[]>>(
    "product/categories/get-all",
    { skipAuth: true },
  );
  return res;
};
