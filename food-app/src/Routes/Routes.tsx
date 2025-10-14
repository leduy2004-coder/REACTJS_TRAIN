import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/Pages/HomePage/HomePage";

// import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import RegisterPage from "@/Pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
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
