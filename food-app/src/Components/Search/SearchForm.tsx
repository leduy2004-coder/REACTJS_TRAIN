import { type ChangeEvent, type SyntheticEvent } from "react";
import type { CategoriesResponse } from "@/Models/Category";
interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  categories: CategoriesResponse[];
  loading: boolean;
  onSubmit: (e: SyntheticEvent) => void;
  onClearFilters: () => void;
}
const SearchForm = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
  loading,
  onSubmit,
  onClearFilters,
}: SearchFormProps) => {
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    if (type === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  return (
    <div className="mb-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Tìm kiếm sản phẩm
      </h1>

      {/* Search Form */}
      <form onSubmit={onSubmit} className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search by name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập tên sản phẩm..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Category filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Giá tối thiểu (VNĐ)
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              placeholder="0"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Max price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Giá tối đa (VNĐ)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              placeholder="Không giới hạn"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
          <button
            type="button"
            onClick={onClearFilters}
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
          >
            Xóa bộ lọc
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
