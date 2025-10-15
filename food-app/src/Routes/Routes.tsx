import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/Pages/HomePage";
import ProfilePage from "@/Pages/ProfilePage";

// import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/Pages/LoginPage";
import RegisterPage from "@/Pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "profile", element: <ProfilePage /> },
      // {
      //   path: "search",
      //   element: (
      //     <ProtectedRoute>
      //       <SearchPage />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);
