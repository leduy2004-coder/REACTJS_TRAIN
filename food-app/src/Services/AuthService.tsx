import * as callPath from "@/Utils/httpRequest";

import type { ApiResponse } from "@/Models/Response";
import type { UserProfileToken } from "@/Models/User";

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
    "",
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
  nickname: string,
): Promise<ApiResponse<void>> => {
  const res = await callPath.post<ApiResponse<void>>(
    "auth/users/register",
    { email, username, password, nickname },
    "", 
  );
  return res.data;
};

/**
 * logout user
 */
export const logoutAPI = async (token: string): Promise<ApiResponse<void>> => {
  const res = await callPath.post<ApiResponse<void>>(
    "auth/auth/logout",
    {},
    token,
  );
  return res.data;
}
