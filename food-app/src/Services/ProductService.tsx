import * as callPath from "@/Utils/httpRequest";
import type { ApiResponse, PageResponse } from "@/Models/Response";
import type {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductGetResponse,
  ProductUpdateRequest,
  ProductUpdateImageRequest,
  CloudinaryResponse,
} from "@/Models/Product";

/**
 * Get current user's products (paginated)
 */

export const getMyProductsAPI = async (
  page = 1,
  size = 10,
  tokenStr: string,
): Promise<ApiResponse<PageResponse<ProductGetResponse>>> => {
  const res = await callPath.get<ApiResponse<PageResponse<ProductGetResponse>>>(
    "product/get-my-products",
    tokenStr,
    { params: { page, size } },
  );
  return res;
};
/**
 * Get products by category (paginated)
 */

export const getAllProductByCategory = async (
  page = 1,
  size = 10,
  categoryId: string,
  tokenStr: string,
): Promise<ApiResponse<PageResponse<ProductGetResponse>>> => {

  const res = await callPath.get<ApiResponse<PageResponse<ProductGetResponse>>>(
    `product/get-products-by-category/${categoryId}`,
    tokenStr,
    { params: { page, size } },
  );
  return res;
};
/**
 * Get all products 
 */

export const getAllProduct = async (
  page = 1,
  size = 10,
  tokenStr: string,
): Promise<ApiResponse<PageResponse<ProductGetResponse>>> => {
  const res = await callPath.get<ApiResponse<PageResponse<ProductGetResponse>>>(
    `product/get-all-products`,
    tokenStr,
    { params: { page, size } },
  );
  return res;
};
/**
 * Create new product with images
 */
export const createProductAPI = async (
  request: ProductCreateRequest,
  tokenStr: string,
  files?: File[],
): Promise<ApiResponse<ProductCreateResponse>> => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);
  files?.forEach((file) => formData.append("files", file));

  const res = await callPath.post<ApiResponse<ProductCreateResponse>>(
    "product/create",
    formData,
    tokenStr,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data;
};

/**
 * Delete product by ID
 */
export const deleteProductAPI = async (
  productId: string,
  tokenStr: string,
): Promise<ApiResponse<boolean>> => {
  const form = new URLSearchParams();
  form.append("productId", productId);

  const res = await callPath.post<ApiResponse<boolean>>(
    "product/delete",
    form,
    tokenStr,
  );
  return res.data;
};

/**
 * Update product content
 */
export const updateProductAPI = async (
  request: ProductUpdateRequest,
  tokenStr: string,
): Promise<ApiResponse<ProductGetResponse>> => {
  const res = await callPath.patch<ApiResponse<ProductGetResponse>>(
    "product/update/content",
    request,
    tokenStr,
  );
  return res.data;
};
/**
 * Update product images
 */
export const updateImageAPI = async (
  request: ProductUpdateImageRequest,
  tokenStr: string,
  files?: File[],
): Promise<ApiResponse<CloudinaryResponse[]>> => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);
  files?.forEach((file) => formData.append("files", file));

  const res = await callPath.post<ApiResponse<CloudinaryResponse[]>>(
    "product/update/image",
    formData,
    tokenStr,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data;
};
