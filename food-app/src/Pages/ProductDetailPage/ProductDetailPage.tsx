import { useLocation, useParams, Link } from "react-router-dom";
import type { ProductGetResponse } from "@/Models/Product";
import Image from "@/Components/Image";
import images from "@/assets/images";
import config from "@/Config";
import Comments from "@/Components/Comment";

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const product =
    (location.state as { product?: ProductGetResponse } | null)?.product ||
    null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Chi tiết sản phẩm
          </h1>
          <Link
            to={config.routes.search}
            className="text-blue-600 hover:underline"
          >
            Quay lại tìm kiếm
          </Link>
        </div>

        {!product ? (
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-gray-600">
              Không có dữ liệu sản phẩm (ID: {id}). Hãy truy cập từ trang tìm
              kiếm.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Hình ảnh sản phẩm */}
              <div className="rounded-lg bg-white p-4 shadow">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.imgUrl?.[0]?.url || images.noImage}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {product.imgUrl?.length > 1 && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {product.imgUrl.slice(1, 6).map((img) => (
                      <div
                        key={img.id}
                        className="aspect-square overflow-hidden rounded-md bg-gray-100"
                      >
                        <Image
                          src={img.url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Thông tin sản phẩm */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  {product.name}
                </h2>

                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    {product.user.nickName}
                  </span>
                </div>

                <div className="mb-6 text-3xl font-bold text-red-600">
                  {product.price.toLocaleString()} đ
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium text-gray-800">
                    Mô tả
                  </h3>
                  <p className="whitespace-pre-wrap text-gray-700">
                    {product.description}
                  </p>
                </div>

                {/* 🧍 Thông tin người đăng */}
                {product.user && (
                  <div className="mt-8 rounded-lg border border-gray-100 bg-gray-50 p-4 shadow-sm transition hover:shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                      Thông tin người đăng
                    </h3>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-lg font-bold text-white shadow-sm">
                        {product.user.nickName.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="text-base font-medium text-gray-900">
                          {product.user.nickName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {product.user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10">
              <Comments productId={product.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
