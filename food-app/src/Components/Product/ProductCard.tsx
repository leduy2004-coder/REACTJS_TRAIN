import Image from "../Image";
export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type Props = {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="mb-3 h-40 w-full rounded-md object-cover"
      />
      <div className="mb-2 font-semibold text-gray-800">{product.name}</div>
      <div className="mb-3 text-gray-600">{product.price.toLocaleString()} đ</div>
      <div className="flex gap-2">
        <button
          className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
          onClick={() => onEdit(product.id)}
        >
          Sửa
        </button>
        <button
          className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          onClick={() => onDelete(product.id)}
        >
          Xóa
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

