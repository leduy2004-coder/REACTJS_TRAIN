import { createContext, useEffect, useState, useContext } from "react";
import type { UserProfile } from "@/Models/User";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { logoutAPI } from "@/Services/AuthService";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserAuth() {
  return useContext(UserContext);
}
export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token") ;
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

 

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    logoutAPI();
    localStorage.clear();
    setUser(null);
    setToken("");
    navigate("/");
  };
  const value = {
    user,
    token,
    logout,
    isLoggedIn,
    setUser,
    setToken,
  };

  return (
    <UserContext.Provider value={value}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
