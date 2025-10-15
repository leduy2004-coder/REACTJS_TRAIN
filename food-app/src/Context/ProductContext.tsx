import React, { createContext, useContext, useState } from "react";
import type { Product } from "@/Components/Product/ProductCard";
import { getMyProductsAPI } from "@/Services/ProductService";
import { toast } from "react-toastify";
import { UserAuth } from "./UserContext";
type ProductContextType = {
  products: Product[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  refreshProducts: (page?: number) => Promise<void>;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  removeProduct: (id: string) => void;
  isAddOpen: boolean;
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

export function UseProducts() {
  return useContext(ProductContext);
}

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = UserAuth();

  // ✅ Không tự động gọi API ở đây nữa
  const refreshProducts = async (pageNum = 1) => {
    try {
      setIsLoading(true);
      const res = await getMyProductsAPI(pageNum, 10, token || "");
      const data = res.result;
      setProducts(data?.data || []);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = (p: Product) => setProducts((prev) => [...prev, p]);
  const updateProduct = (p: Product) =>
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  const removeProduct = (id: string) =>
    setProducts((prev) => prev.filter((item) => item.id !== id));

  const value = {
    products,
    page,
    totalPages,
    isLoading,
    setPage,
    refreshProducts,
    addProduct,
    updateProduct,
    removeProduct,
    isAddOpen,
    setIsAddOpen,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
