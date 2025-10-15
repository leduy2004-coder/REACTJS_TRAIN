import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/Context/UserContext";
import { HeaderLayout } from "./Components/Header";
import { ProductProvider } from "./Context/ProductContext";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <HeaderLayout />
        <Outlet />
        <ToastContainer />
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
