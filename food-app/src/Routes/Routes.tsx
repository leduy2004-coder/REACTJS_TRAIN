import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/Pages/HomePage";
import ProfilePage from "@/Pages/ProfilePage";
import SearchPage from "@/Pages/SearchPage";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/Pages/LoginPage";
import RegisterPage from "@/Pages/RegisterPage";
import ProductDetailPage from "@/Pages/ProductDetailPage/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
