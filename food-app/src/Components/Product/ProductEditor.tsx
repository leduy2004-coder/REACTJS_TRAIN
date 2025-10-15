import { useState } from "react";
import type { Product } from "./ProductCard";

type Props = {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
};

const ProductEditor = ({ product, onClose, onSave }: Props) => {
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<string>(String(product.price));
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedPrice = Number(price);
    onSave({
      ...product,
      name: name.trim() || "Không tên",
      price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
      imageUrl: imageUrl.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Chỉnh sửa sản phẩm</h3>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Tên</span>
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Giá</span>
            <input
              type="number"
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Ảnh (URL)</span>
            <input
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditor;

