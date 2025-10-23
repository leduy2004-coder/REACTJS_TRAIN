import * as callPath from "@/Utils/httpRequest";
import type { ApiResponse, PageResponse } from "@/Models/Response";
import type {
  CommentCreateRequest,
  CommentCreateResponse,
  CommentGetResponse,
} from "@/Models/Comment";

/**
 * Create new comment for product
 */
export const createCommentAPI = async (
  request: CommentCreateRequest,
): Promise<ApiResponse<CommentCreateResponse>> => {
  const res = await callPath.post<ApiResponse<CommentCreateResponse>>(
    "product/comment/create",
    request,
  );
  return res.data;
};

/**
 * Get comments by product ID (paginated)
 */
export const getCommentByProductIdAPI = async (
  productId: string,
  page = 1,
  size = 10,
): Promise<ApiResponse<PageResponse<CommentGetResponse>>> => {
  const res = await callPath.get<ApiResponse<PageResponse<CommentGetResponse>>>(
    `product/comment/get-by-id/${productId}`,
    { params: { page, size } },
  );
  return res;
};

/**
 * Delete comment by ID
 */
export const deleteCommentAPI = async (
  commentId: string,
): Promise<ApiResponse<boolean>> => {
  console.log("Deleting comment with ID:", commentId);
  const res = await callPath.deleted<ApiResponse<boolean>>(
    `product/comment/delete/${commentId}`,
  );
  return res.data;
};
