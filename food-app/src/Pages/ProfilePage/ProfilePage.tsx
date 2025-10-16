import { useEffect, useState } from "react";
import { ProfileInfo } from "@/Components/Profile";
import { UserAuth } from "@/Context/UserContext";
import { UseProducts } from "@/Context/ProductContext";
import { ProductFormModal, ProductCard } from "@/Components/Product";
import type { Product } from "@/Models/Product";
import { toast } from "react-toastify";
import { deleteProductAPI } from "@/Services/ProductService";
import { Pagination } from "@/Pagination";

const ProfilePage = () => {
  const { user, token } = UserAuth();
  const {
    products,
    isAddOpen,
    setIsAddOpen,
    refreshProducts,
    isLoading,
    page,
    totalPages,
    setPage,
  } = UseProducts();
  const [formProduct, setFormProduct] = useState<Product | null>(null);

  useEffect(() => {
    refreshProducts(page);
  }, [page]);

  const handleEdit = (id: string) => {
    const productToEdit = products.find((p) => p.id === id);
    if (productToEdit) {
      setFormProduct(productToEdit);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProductAPI(id, token || "");
      if (response) {
        toast.success("Xóa sản phẩm thành công!");
        refreshProducts();
      } else {
        toast.error("Không thể xóa sản phẩm!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

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
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);
                refreshProducts(newPage);
              }}
            />
          </>
        )}
      </section>

      {isAddOpen && (
        <ProductFormModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSaved={() => {
            setIsAddOpen(false);
            refreshProducts();
          }}
        />
      )}

      {formProduct && (
        <ProductFormModal
          isOpen={!!formProduct}
          onClose={() => setFormProduct(null)}
          onSaved={() => {
            setFormProduct(null);
            refreshProducts();
          }}
          product={formProduct}
        />
      )}
    </div>
  );
};

export default ProfilePage;
