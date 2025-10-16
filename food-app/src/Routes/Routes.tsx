import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/Pages/HomePage";
import ProfilePage from "@/Pages/ProfilePage";
import SearchPage from "@/Pages/SearchPage";

import LoginPage from "@/Pages/LoginPage";
import RegisterPage from "@/Pages/RegisterPage";
import ProductDetailPage from "@/Pages/ProductDetailPage";
import config from "@/Config";
import { RoleBasedGuard, AuthGuard } from "./Guards";

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
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: config.routes.search,
        element: (
          <AuthGuard>
            <SearchPage />
          </AuthGuard>
        ),
      },
      {
        path: config.routes.product,
        element: (
          <AuthGuard>
            <ProductDetailPage />
          </AuthGuard>
        ),
      },
      {
        path: config.routes.admin_category,
        element: (
          <AuthGuard>
            <RoleBasedGuard allowedRoles={["ADMIN"]}>
              <ProductDetailPage />
            </RoleBasedGuard>
          </AuthGuard>
        ),
      },
    ],
  },
]);
