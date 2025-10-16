import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const httpRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  headers: {
    "Content-type": "application/json",
  },
});

/**
 * Hàm tiện ích tạo headers chỉ khi có token
 */
const buildHeaders = (tokenStr: string, options: AxiosRequestConfig = {}) => {
  const headers: Record<string, string> = { ...(options.headers as Record<string, string> ?? {}) };
  if (tokenStr && tokenStr.trim() !== "") {
    headers.Authorization = `Bearer ${tokenStr}`;
  }
  return { ...options, headers };
};

// =======================
// GET
// =======================
export const get = async <T>(
  path: string,
  tokenStr: string,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  const response = await httpRequest.get<T>(
    path,
    buildHeaders(tokenStr, options),
  );
  return response.data;
};

// =======================
// POST
// =======================
export const post = async <T>(
  path: string,
  data: unknown,
  tokenStr: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  const response = await httpRequest.post<T>(
    path,
    data,
    buildHeaders(tokenStr, options),
  );
  return response;
};

// =======================
// PATCH
// =======================
export const patch = async <T>(
  path: string,
  data: unknown,
  tokenStr: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  const response = await httpRequest.patch<T>(
    path,
    data,
    buildHeaders(tokenStr, options),
  );
  return response;
};

// =======================
// DELETE
// =======================
export const deleted = async <T>(
  path: string,
  tokenStr: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  const response = await httpRequest.delete<T>(
    path,
    buildHeaders(tokenStr, options),
  );
  return response;
};

export default httpRequest;
