// import axios, {
//   type AxiosError,
//   type AxiosInstance,
//   type AxiosRequestConfig,
//   type AxiosResponse,
// } from 'axios';

// // Prefer Vite env (import.meta.env) but fall back to process.env for compatibility
// const ENV_BASE_URL: string =
//     (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_BASE_URL) ||
//     (typeof process !== 'undefined' ? (process.env as any)?.REACT_APP_BASE_URL : '') ||
//     '';

// const trimTrailingSlash = (url: string): string => (url ? url.replace(/\/$/, '') : url);

// const ROOT_BASE_URL = trimTrailingSlash(ENV_BASE_URL);
// const API_BASE_URL = ROOT_BASE_URL ? `${ROOT_BASE_URL}/api` : '/api';

// // Create Axios instance
// const httpRequest: AxiosInstance = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// let isRefreshing = false;

// type FailedRequest = {
//     resolve: (value?: unknown) => void;
//     reject: (reason?: any) => void;
// };

// let failedQueue: FailedRequest[] = [];

// const processQueue = (error?: any, token: string | null = null): void => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// httpRequest.interceptors.response.use(
//     (response: AxiosResponse) => response,
//     async (error: AxiosError): Promise<any> => {
//         const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//         if (error.response && error.response.status === 401 && originalRequest) {
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 try {
//                     const rawRefreshToken = localStorage.getItem('refresh_token');
//                     const refreshToken: string | null = rawRefreshToken
//                         ? JSON.parse(rawRefreshToken)
//                         : null;

//                     if (!refreshToken) {
//                         throw new Error('Missing refresh token');
//                     }

//                     const refreshUrl = `${ROOT_BASE_URL}/v1/auth/refresh-token`;

//                     const response = await axios.post(
//                         refreshUrl,
//                         null,
//                         {
//                             headers: {
//                                 Authorization: refreshToken,
//                             },
//                         },
//                     );

//                     if (response.status === 200) {
//                         const { access_token, refresh_token } = (response.data as any).result || {};

//                         const bearerAccess = `Bearer ${access_token}`;
//                         const bearerRefresh = `Bearer ${refresh_token}`;

//                         localStorage.setItem('access_token', JSON.stringify(bearerAccess));
//                         localStorage.setItem('refresh_token', JSON.stringify(bearerRefresh));

//                         // Update header on the original request
//                         originalRequest.headers = {
//                             ...(originalRequest.headers || {}),
//                             Authorization: bearerAccess,
//                         } as any;

//                         processQueue(null, access_token);
//                         // Optionally reload to ensure app state picks up new token
//                         // Keeping original behavior
//                         window.location.reload();
//                         return httpRequest(originalRequest);
//                     }
//                     throw new Error('Token refresh failed');
//                 } catch (refreshErr) {
//                     processQueue(refreshErr, null);
//                     localStorage.clear();
//                     window.location.href = '/login';
//                 } finally {
//                     isRefreshing = false;
//                 }
//             }

//             return new Promise((resolve, reject) => {
//                 failedQueue.push({ resolve, reject });
//             })
//                 .then((token) => {
//                     const newToken = typeof token === 'string' ? token : '';
//                     originalRequest.headers = {
//                         ...(originalRequest.headers || {}),
//                         Authorization: `Bearer ${newToken}`,
//                     } as any;
//                     return httpRequest(originalRequest);
//                 })
//                 .catch((queueErr) => Promise.reject(queueErr));
//         }

//         return Promise.reject(error);
//     },
// );

// // Typed HTTP helpers
// export const get = async <T = any>(
//     path: string,
//     tokenStr?: string,
//     options: AxiosRequestConfig = {},
// ): Promise<T> => {
//     const response = await httpRequest.get<T>(path, {
//         ...options,
//         headers: {
//             ...(options.headers || {}),
//             ...(tokenStr ? { Authorization: tokenStr } : {}),
//         },
//     });
//     return response.data;
// };

// export const post = async <T = any, B = any>(
//     path: string,
//     data?: B,
//     tokenStr?: string,
//     options: AxiosRequestConfig = {},
// ): Promise<AxiosResponse<T>> => {
//     const response = await httpRequest.post<T>(path, data, {
//         ...options,
//         headers: {
//             ...(options.headers || {}),
//             ...(tokenStr ? { Authorization: tokenStr } : {}),
//         },
//     });
//     return response;
// };

// export const patch = async <T = any, B = any>(
//     path: string,
//     data?: B,
//     tokenStr?: string,
//     options: AxiosRequestConfig = {},
// ): Promise<AxiosResponse<T>> => {
//     const response = await httpRequest.patch<T>(path, data, {
//         ...options,
//         headers: {
//             ...(options.headers || {}),
//             ...(tokenStr ? { Authorization: tokenStr } : {}),
//         },
//     });
//     return response;
// };

// export const deleted = async <T = any>(
//     path: string,
//     tokenStr?: string,
//     options: AxiosRequestConfig = {},
// ): Promise<AxiosResponse<T>> => {
//     const response = await httpRequest.delete<T>(path, {
//         ...options,
//         headers: {
//             ...(options.headers || {}),
//             ...(tokenStr ? { Authorization: tokenStr } : {}),
//         },
//     });
//     return response;
// };

// export default httpRequest;



