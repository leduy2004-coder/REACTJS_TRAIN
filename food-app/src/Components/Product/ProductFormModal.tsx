import { useEffect, useState } from "react";
import { getAllCategoriesAPI } from "@/Services/CategoryService";
import config from "@/Services";
import { toast } from "react-toastify";
import type {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductUpdateRequest,
  Product,
} from "@/Models/Product";
import type { CategoriesResponse } from "@/Models/Category";
import { UserAuth } from "@/Context/UserContext";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (product: ProductCreateResponse | Product) => void;
  product?: Product; // Nếu có thì là edit, không có thì là add
};

const ProductFormModal = ({ isOpen, onClose, onSaved, product }: Props) => {
  const { token } = UserAuth();
  const isEdit = !!product?.id;
  const [form, setForm] = useState<ProductCreateRequest>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    categoryId: product?.categoryId || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    product?.imgUrl?.[0].url || "",
  );
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);

  useEffect(() => {
    getAllCategoriesAPI().then((res) => setCategories(res.result || []));
  }, []);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description || "",
        price: product.price,
        categoryId: product.categoryId || "",
      });
      setPreview(product.imgUrl?.[0].url || "");
      setFile(null);
    } else {
      setForm({ name: "", description: "", price: 0, categoryId: "" });
      setPreview("");
      setFile(null);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleChange = (
    field: keyof ProductCreateRequest,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!form.name || !form.price) {
      toast.warning("Vui lòng nhập tên và giá sản phẩm!");
      return;
    }
    try {
      if (isEdit && product) {
        // Update content
        await config.updateProductAPI(
          {
            id: product.id,
            name: form.name,
            description: form.description,
            price: form.price,
            categoryId: form.categoryId,
          } as ProductUpdateRequest,
          token || "",
        );
        // Update image nếu có file mới
        if (file) {
          await config.updateImageAPI({ productId: product.id }, token || "", [file]);
        }
        toast.success("Cập nhật sản phẩm thành công!");
        onSaved({
          ...product,
          ...form,
          imgUrl: file
            ? [
                {
                  url: preview,
                  publicId: "",
                  id: product.imgUrl?.[0]?.id || "",
                },
              ]
            : product.imgUrl || [],
        });
      } else {
        // Add mới
        const res = await config.createProductAPI(
          form,
          token || "",
          file ? [file] : undefined,
        );
        toast.success("Thêm sản phẩm thành công!");
        onSaved(res.result);
      }
      onClose();
      setForm({ name: "", description: "", price: 0, categoryId: "" });
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error(
        isEdit ? "Không thể cập nhật sản phẩm." : "Không thể tạo sản phẩm.",
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h3>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            className="rounded border px-3 py-2"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <textarea
            placeholder="Mô tả"
            className="rounded border px-3 py-2"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <input
            type="number"
            placeholder="Giá (VNĐ)"
            className="rounded border px-3 py-2"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />
          <select
            className="rounded border px-3 py-2"
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full rounded object-cover"
            />
          )}
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
              {isEdit ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
