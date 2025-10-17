import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { createCategoryAPI } from "@/Services/CategoryService";
import type {
  CategoryCreateRequest,
  CategoriesResponse,
} from "@/Models/Category";
import { toast } from "react-toastify";
interface AdminCategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (newCategory?: CategoriesResponse) => void;
}

const CategoryFormModal = ({
  isOpen,
  onClose,
  onSaved,
}: AdminCategoryFormModalProps) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning("Vui lòng nhập tên danh mục!");
      return;
    }

    const request: CategoryCreateRequest = { name };
    setLoading(true);

    try {
      const response = await createCategoryAPI(request, file || undefined);
      if (response.code === 1000) {
        toast.success("Tạo danh mục thành công!");
        onSaved(response.result);
        setName("");
        setFile(null);
      } else {
        toast.error(response.message || "Không thể tạo danh mục.");
      }
    } catch (err) {
      console.error("Create category error:", err);
      toast.error("Lỗi khi tạo danh mục!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Thêm danh mục mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên danh mục */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tên danh mục
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên danh mục"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Ảnh */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Ảnh danh mục (tùy chọn)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-500">
                Đã chọn: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
