import type { ProductGetResponse } from "@/Models/Product";
import ProductGrid from "./ProductGrid";

interface SearchResultsProps {
  products: ProductGetResponse[];
  loading: boolean;
  error: string;
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
  onViewDetails?: (productId: string) => void;
  onLoadMore?: () => void;
}

const SearchResults = ({
  products,
  loading,
  error,
  searchQuery,
  selectedCategory,
  currentPage,
  totalPages,
  onViewDetails,
  onLoadMore,
}: SearchResultsProps) => {
  const hasSearchCriteria = searchQuery || selectedCategory;
  const hasResults = products.length > 0;
  const canLoadMore = currentPage < totalPages;

  return (
    <div className="mb-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Results Count */}
      {hasResults && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Tìm thấy {products.length} sản phẩm
          </p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && !hasResults && hasSearchCriteria && (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-600">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-500">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && hasResults && (
        <ProductGrid products={products} onViewDetails={onViewDetails} />
      )}

      {/* Load More Button */}
      {!loading && hasResults && canLoadMore && onLoadMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            className="rounded-lg bg-gray-600 px-6 py-2 text-white hover:bg-gray-700"
          >
            Tải thêm sản phẩm
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
