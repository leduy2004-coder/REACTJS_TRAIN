import type { Product } from "@/Models/Product";
import Image from "../Image";
import DeleteConfirmDialogProps from "./DeleteConfirmDialog";

type Props = {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <Image
        src={product?.imgUrl?.[0]?.url}
        alt={product.name}
        className="mb-3 h-40 w-full rounded-md object-cover"
      />
      <div className="mb-2 font-semibold text-gray-800">{product.name}</div>
   
      <div className="mb-3 text-gray-600">
        {product.price.toLocaleString()} đ
      </div>
      <div className="flex gap-2">
        <button
          className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
          onClick={() => onEdit(product.id)}
        >
          Sửa
        </button>

        <DeleteConfirmDialogProps onConfirm={() => onDelete(product.id)} />
      </div>
    </article>
  );
};

export default ProductCard;
