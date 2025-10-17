import * as callPath from "@/Utils/httpRequest";

import type { ApiResponse } from "@/Models/Response";
import type { RoleRequest, UserProfileToken } from "@/Models/User";

/**
 * Login user and get token
 */
export const loginAPI = async (
  username: string,
  password: string,
): Promise<ApiResponse<UserProfileToken>> => {
  const res = await callPath.post<ApiResponse<UserProfileToken>>(
    "auth/auth2/authenticate",
    { username, password },
    { skipAuth: true }
  );
  return res.data;
};

/**
 * Register new user
 */
export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  nickName: string,
  status: true,
  roles: RoleRequest[] = [{ code: "USER", name: "User" }],
): Promise<ApiResponse<void>> => {
  const res = await callPath.post<ApiResponse<void>>(
    "auth/users/register",
    { email, username, password, nickName, status, roles },
    { skipAuth: true }
  );
  return res.data;
};

/**
 * logout user
 */
export const logoutAPI = async (): Promise<ApiResponse<void>> => {
  const res = await callPath.post<ApiResponse<void>>(
    "auth/auth/logout",
    {},
  );
  return res.data;
};

