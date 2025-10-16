import { useEffect, useState } from "react";
import { getAllCategoriesAPI } from "@/Services/CategoryService";
import type { CategoriesResponse } from "@/Models/Category";
import CardCategory from "@/Components/Category/Card";
import { CategoryFormModal } from "@/Components/Category/FormModel";

const AdminCategory = () => {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategoriesAPI();
      if (response.code === 1000) {
        setCategories(response.result);
      } else {
        setError("Không thể tải danh mục.");
      }
    } catch {
      setError("Lỗi khi tải danh mục.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-[#5c4726] p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-3xl font-bold text-amber-700">
            🟤 Quản lý danh mục
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-700 hover:shadow-lg active:scale-95"
          >
            + Thêm danh mục
          </button>
        </div>

        {/* Nội dung */}
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-xl">
          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-10">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && categories.length === 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-10 text-center text-amber-600">
              Chưa có danh mục nào.
            </div>
          )}

          {/* Danh sách */}
          {!loading && !error && categories.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((item) => (
                <div
                  key={item.id}
                  className="transform rounded-xl border border-amber-200 bg-gradient-to-br from-yellow-50 to-amber-100 p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-200"
                >
                  <CardCategory item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={() => {
            setIsModalOpen(false);
            loadCategories();
          }}
        />
      )}
    </div>
  );
};

export default AdminCategory;
