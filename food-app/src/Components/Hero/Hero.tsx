const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-100 to-orange-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Bread image */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=400&fit=crop&crop=center"
                alt="Fresh Bread"
                className="w-64 h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Center - Text content */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 font-medium">
                Dễ dàng, Tươi mới & Tiện lợi
              </p>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Dự trữ
                <br />
                <span className="text-red-600">Nhu yếu phẩm hằng ngày</span>
              </h1>

              <div className="space-y-2">
                <p className="text-lg text-gray-600">
                  Tiết kiệm nhiều hơn cho
                </p>
                <p className="text-lg text-gray-600">
                  Những thương hiệu bạn yêu thích
                </p>
              </div>

              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Mua ngay
              </button>
            </div>
          </div>

          {/* Right side - Baked goods */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=120&fit=crop&crop=center"
                  alt="Baguettes"
                  className="w-48 h-24 object-cover rounded-lg shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&h=120&fit=crop&crop=center"
                  alt="Round Bread"
                  className="w-48 h-24 object-cover rounded-lg shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=120&fit=crop&crop=center"
                  alt="Croissant"
                  className="w-48 h-24 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
