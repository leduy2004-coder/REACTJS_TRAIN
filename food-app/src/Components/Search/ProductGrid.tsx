import type { ProductGetResponse } from "@/Models/Product";
import SearchProductCard from "./SearchProductCard";

interface ProductGridProps {
  products: ProductGetResponse[];
  onViewDetails?: (productId: string) => void;
}

const ProductGrid = ({ products, onViewDetails }: ProductGridProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <SearchProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
