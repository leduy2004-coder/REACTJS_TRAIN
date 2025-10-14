import axios from "axios";
import type { UserProfileToken } from "@/Models/User";

const api = "http://localhost:8080/api/v1/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "auth/auth2/authenticate", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  nickname: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "auth/users/register", {
      email: email,
      username: username,
      password: password,
      nickname: nickname,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};