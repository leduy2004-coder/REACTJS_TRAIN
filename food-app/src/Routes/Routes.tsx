import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/Pages/HomePage";
import ProfilePage from "@/Pages/ProfilePage";
import SearchPage from "@/Pages/SearchPage";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/Pages/LoginPage";
import RegisterPage from "@/Pages/RegisterPage";
import ProductDetailPage from "@/Pages/ProductDetailPage";
import config from "@/Config";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: config.routes.login, element: <LoginPage /> },
      { path: config.routes.register, element: <RegisterPage /> },
      {
        path: config.routes.profile,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: config.routes.search,
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: config.routes.product,
        element: (
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
