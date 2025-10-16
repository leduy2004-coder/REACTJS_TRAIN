import type { ProductGetResponse } from "@/Models/Product";
import ProductGrid from "./ProductGrid";

interface SearchResultsProps {
  products: ProductGetResponse[];
  loading: boolean;
  error: string;
  searchQuery?: string;
  selectedCategory?: string;
  onViewDetails?: (productId: string) => void;
}

const SearchResults = ({
  products,
  loading,
  error,
  searchQuery,
  selectedCategory,
  onViewDetails,
}: SearchResultsProps) => {
  const hasSearchCriteria = !!(searchQuery || selectedCategory);
  const hasResults = products.length > 0;

  return (
    <div className="mb-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
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
        <div className="py-12 text-center">
          <div className="mb-4 text-gray-400">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-gray-500">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && hasResults && (
        <>
          <p className="mb-4 text-gray-600">
            Tìm thấy {products.length} sản phẩm
          </p>
          <ProductGrid products={products} onViewDetails={onViewDetails} />
        </>
      )}
    </div>
  );
};

export default SearchResults;
