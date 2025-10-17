import { useState, useEffect, type SyntheticEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import config from "@/Services";
import { getAllCategoriesAPI } from "@/Services/CategoryService";
import type { ProductGetResponse } from "@/Models/Product";
import type { CategoriesResponse } from "@/Models/Category";
import { SearchForm, SearchResults } from "@/Components/Search";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<ProductGetResponse[]>([]);
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy dữ liệu từ URL (nếu có)
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const categoryId = searchParams.get("categoryId") || "";

    setSearchQuery(query);
    setSelectedCategory(categoryId);

    if (query || categoryId) {
      performSearch(query, categoryId);
    }
  }, [searchParams]);

  // Load categories khi mở trang
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

  const performSearch = async (query: string, categoryId: string) => {
    setLoading(true);
    setError("");

    try {
      let response;
      if (categoryId) {
        response = await config.getAllProductByCategory(
          1,
          9999,
          categoryId,
        );
      } else {
        response = await config.getAllProduct(1, 9999);
      }

      if (response.code === 1000) {
        let filtered = response.result.data;

        if (query) {
          const q = query.toLowerCase();
          filtered = filtered.filter(
            (p: ProductGetResponse) =>
              p.name?.toLowerCase().includes(q) ||
              p.description?.toLowerCase().includes(q),
          );
        }

        setProducts(filtered);
      } else {
        setError("Không thể tải dữ liệu sản phẩm");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Có lỗi xảy ra khi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory) params.set("categoryId", selectedCategory);
    setSearchParams(params);
    performSearch(searchQuery, selectedCategory);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setProducts([]);
    setSearchParams(new URLSearchParams());
  };

  const handleViewDetails = (id: string) => {
    const product = products.find((p) => p.id === id);
    navigate(`/product/${id}`, { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          loading={loading}
          onSubmit={handleSearchSubmit}
          onClearFilters={clearFilters}
        />

        <SearchResults
          products={products}
          loading={loading}
          error={error}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
};

export default SearchPage;
