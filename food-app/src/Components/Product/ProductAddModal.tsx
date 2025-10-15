import { useState } from "react";
import type { ChangeEvent } from "react";
import type { ProductCreateRequest, ProductCreateResponse } from "@/Models/Product";
import { createProductAPI } from "@/Services/ProductService";
import {toast} from "react-toastify";    

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (product: ProductCreateResponse) => void;
};

const ProductAddModal = ({ isOpen, onClose, onCreated }: Props) => {
  const [form, setForm] = useState<ProductCreateRequest>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleChange = (field: keyof ProductCreateRequest, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit() {
    if (!form.name || !form.price) {
      toast.warning("Vui lòng nhập tên và giá sản phẩm!");
      return;
    }
    try {
      const res = await createProductAPI(form, file ? [file] : []);
      onCreated(res.data.result);
      toast.success("Thêm sản phẩm thành công!");
      onClose();
      setForm({ name: "", description: "", price: 0, categoryId: "" });
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error("Không thể tạo sản phẩm.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Thêm sản phẩm mới</h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            className="w-full rounded border px-3 py-2"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <textarea
            placeholder="Mô tả"
            className="w-full rounded border px-3 py-2"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <input
            type="number"
            placeholder="Giá (VNĐ)"
            className="w-full rounded border px-3 py-2"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />

          <input
            type="text"
            placeholder="ID danh mục (categoryId)"
            className="w-full rounded border px-3 py-2"
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded" />
          )}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAddModal;
