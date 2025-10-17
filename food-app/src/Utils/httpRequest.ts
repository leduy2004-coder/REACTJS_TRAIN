import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}
const httpRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  headers: {
    "Content-type": "application/json",
  },
});

// Flag để tránh gọi refresh token nhiều lần đồng thời
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

/**
 * Gọi API refresh token
 */
const refreshAccessToken = async (): Promise<string | null> => {
  console.log("Refreshing access token...");
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/auth2/refresh-token`,
      {},
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const { result } = response.data;
    const newAccessToken = result?.access_token;
    const newRefreshToken = result?.refresh_token;

    if (newAccessToken) {
      // Lưu token mới
      localStorage.setItem("token", newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem("refresh_token", newRefreshToken);
      }
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

/**
 * Request Interceptor: Tự động thêm token vào header
 */
httpRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Chỉ thêm token nếu không có flag skipAuth
    if (!config.skipAuth) {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response Interceptor: Xử lý token hết hạn và refresh
 */
httpRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    // xử lý code trong body nếu cần
    const { code, message } = response.data || {};
    if (code === 1007) {
      handleForbidden(message || "Bạn không có quyền truy cập");
      return Promise.reject(response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Nếu token hết hạn
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Chờ refresh xong
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => httpRequest(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null);
          return httpRequest(originalRequest);
        } else {
          processQueue(new Error("Refresh token failed"));
          handleLogout("Phiên đăng nhập đã hết hạn");
        }
      } catch (err) {
        processQueue(err);
        handleLogout("Phiên đăng nhập đã hết hạn");
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    // 403 Forbidden
    if (status === 403) {
      const message = error.response?.data?.message;
      handleForbidden(message || "Bạn không có quyền truy cập");
    }

    return Promise.reject(error);
  },
);

/**
 * Xử lý không có quyền truy cập
 */
const handleForbidden = (message: string) => {
  console.warn("Cảnh báo:", message);
  toast(message);
};

/**
 * Xử lý logout: xóa token và redirect về login
 */
const handleLogout = (message: string) => {
  localStorage.clear();
  toast(message);
  window.location.href = "/login";
};

// =======================
// API Methods
// =======================
export const get = async <T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  const response = await httpRequest.get<T>(path, options);
  return response.data;
};

export const post = async <T>(
  path: string,
  data: unknown,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  return await httpRequest.post<T>(path, data, options);
};

export const patch = async <T>(
  path: string,
  data: unknown,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  return await httpRequest.patch<T>(path, data, options);
};

export const deleted = async <T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> => {
  return await httpRequest.delete<T>(path, options);
};

export default httpRequest;
