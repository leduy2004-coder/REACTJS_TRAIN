import { useState, useEffect, type SyntheticEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAllProduct,
  getAllProductByCategory,
} from "@/Services/ProductService";
import { getAllCategoriesAPI } from "@/Services/CategoryService";
import type { ProductGetResponse } from "@/Models/Product";
import type { CategoriesResponse } from "@/Models/Category";
import { SearchForm, SearchResults } from "@/Components/Search";
import { UserAuth } from "@/Context/UserContext";
const SearchPage = () => {
  const navigate = useNavigate();
  const { token } = UserAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // Data state
  const [products, setProducts] = useState<ProductGetResponse[]>([]);
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 12;

  // Initialize search parameters from URL
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const categoryId = searchParams.get("categoryId") || "";

    setSearchQuery(query);
    setSelectedCategory(categoryId);

    if (query || categoryId) {
      performSearch(query, categoryId, minPrice, maxPrice, 1);
    }
  }, [searchParams]);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getAllCategoriesAPI();
      if (response.code === 1000) {
        setCategories(response.result);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const performSearch = async (
    query: string,
    categoryId: string,
    minPrice: string,
    maxPrice: string,
    page: number,
  ) => {
    setLoading(true);
    setError("");

    try {
      let response;
      if (categoryId) {
        // Search by category
        response = await getAllProductByCategory(
          page,
          pageSize,
          categoryId,
          token!,
        );
      } else {
        // For now, we'll use category search as a fallback
        // In a real app, you'd have a dedicated search endpoint
        response = await getAllProduct(page, pageSize, token!);
      }
      if (response.code === 1000) {
        let filteredProducts = response.result.data;

        // Client-side filtering for name and price
        if (query) {
          filteredProducts = filteredProducts.filter(
            (product: ProductGetResponse) => {
              const name = product.name?.toLowerCase() ?? "";
              const desc = product.description?.toLowerCase() ?? "";
              const q = query.toLowerCase();
              return name.includes(q) || desc.includes(q);
            },
          );
        }

        if (minPrice) {
          filteredProducts = filteredProducts.filter(
            (product: ProductGetResponse) =>
              product.price >= parseFloat(minPrice),
          );
        }

        if (maxPrice) {
          filteredProducts = filteredProducts.filter(
            (product: ProductGetResponse) =>
              product.price <= parseFloat(maxPrice),
          );
        }

        setProducts(filteredProducts);
        setTotalPages(response.result.totalPages);
        setCurrentPage(page);
      } else {
        setError("Không thể tải dữ liệu sản phẩm");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tìm kiếm");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();

    if (searchQuery.trim()) {
      newParams.set("q", searchQuery.trim());
    }
    if (selectedCategory) {
      newParams.set("categoryId", selectedCategory);
    }
    if (minPrice) {
      newParams.set("minPrice", minPrice);
    }
    if (maxPrice) {
      newParams.set("maxPrice", maxPrice);
    }

    setSearchParams(newParams);
    performSearch(searchQuery, selectedCategory, minPrice, maxPrice, 1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setProducts([]);
    setSearchParams(new URLSearchParams());
  };

  const loadMoreProducts = () => {
    if (currentPage < totalPages) {
      performSearch(
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        currentPage + 1,
      );
    }
  };

  const handleViewDetails = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    navigate(`/product/${productId}`, { state: { product } });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          categories={categories}
          loading={loading}
          onSubmit={handleSearchSubmit}
          onClearFilters={clearFilters}
        />

        {/* Search Results */}
        <SearchResults
          products={products}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          totalPages={totalPages}
          onViewDetails={handleViewDetails}
          onLoadMore={loadMoreProducts}
        />
      </div>
    </div>
  );
};

export default SearchPage;
