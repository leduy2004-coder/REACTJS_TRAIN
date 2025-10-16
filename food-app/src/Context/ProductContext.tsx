import React, { createContext, useContext, useState } from "react";
import { getMyProductsAPI } from "@/Services/ProductService";
import { toast } from "react-toastify";
import { UserAuth } from "./UserContext";
import type { Product } from "@/Models/Product";
type ProductContextType = {
  products: Product[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  refreshProducts: (page?: number) => Promise<void>;
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

  const refreshProducts = async (pageNum = 1) => {
    try {
      setIsLoading(true);
      const res = await getMyProductsAPI(pageNum, 2, token || "");
      const data = res.result;
      setProducts(data.data);
      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    products,
    page,
    totalPages,
    isLoading,
    setPage,
    refreshProducts,
    isAddOpen,
    setIsAddOpen,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
