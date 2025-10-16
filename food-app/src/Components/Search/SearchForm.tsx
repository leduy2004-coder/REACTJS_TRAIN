import { type ChangeEvent, type SyntheticEvent } from "react";
import type { CategoriesResponse } from "@/Models/Category";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
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
  categories,
  loading,
  onSubmit,
  onClearFilters,
}: SearchFormProps) => {
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Tìm kiếm sản phẩm
      </h1>

      <form onSubmit={onSubmit} className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập tên sản phẩm..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedCategory(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
