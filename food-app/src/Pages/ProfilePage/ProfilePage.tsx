import { useEffect, useMemo, useState } from "react";
import ProductEditor from "@/Components/Product/ProductEditor";
import ProductCard from "@/Components/Product/ProductCard";
import ProfileInfo from "@/Components/Profile/ProfileInfo";
import ProductAddModal from "@/Components/Product/ProductAddModal";
import { UserAuth } from "@/Context/UserContext";
import { UseProducts } from "@/Context/ProductContext";

const ProfilePage = () => {
  const { user } = UserAuth();
  const { products, isAddOpen, setIsAddOpen, refreshProducts, isLoading } =
    UseProducts();

  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Gọi API khi mở trang
  useEffect(() => {
    refreshProducts();
  }, []);

  const editingProduct = useMemo(
    () => products.find((p) => p.id === editingId) ?? null,
    [products, editingId],
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Hồ sơ cá nhân</h1>

      <ProfileInfo nickName={user?.nickName || ""} email={user?.email || ""} />

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Sản phẩm</h2>
          <button
            onClick={() => setIsAddOpen(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
          >
            Thêm
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditingId}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </section>

      {isAddOpen && (
        <ProductAddModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onCreated={() => refreshProducts()}
        />
      )}

      {editingProduct && (
        <ProductEditor
          key={editingProduct.id}
          product={editingProduct}
          onClose={() => setEditingId(null)}
          onSave={() => refreshProducts()}
        />
      )}
    </div>
  );
};

export default ProfilePage;
