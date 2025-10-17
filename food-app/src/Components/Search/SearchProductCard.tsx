import type { ProductGetResponse } from "@/Models/Product";
import Image from "@/Components/Image";

interface SearchProductCardProps {
  product: ProductGetResponse;
  onViewDetails?: (productId: string) => void;
}

const SearchProductCard = ({
  product,
  onViewDetails,
}: SearchProductCardProps) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 h-48 w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={product.imgUrl?.[0]?.url}
          alt={product.name}
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="mb-2">
        <h3 className="line-clamp-2 font-semibold text-gray-800">
          {product.name}
        </h3>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-bold text-red-600">
          {product.price.toLocaleString()} đ
        </span>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
          {product.user.nickName}
        </span>
      </div>
      <button
        onClick={handleViewDetails}
        className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
      >
        Xem chi tiết
      </button>
    </div>
  );
};

export default SearchProductCard;
