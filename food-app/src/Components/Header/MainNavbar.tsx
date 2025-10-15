import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import images from "@/assets/images";
import Image from "@/Components/Image";
const MainNavbar = () => {
  const [search, setSearch] = useState<string>("");
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("Searching for:", search);
      // TODO: Implement search functionality
    }
  };

  return (
    <div className="bg-[rgb(206,196,43)] px-4 py-2 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Image
            src={images.logo}
            alt="FoodApp"
            className="h-8 w-auto object-contain sm:h-10 md:h-12"
            width={120}
            height={120}
          />
          <span className="ml-2 text-2xl font-bold">FOODLD</span>
        </Link>

        {/* Desktop Search */}
        <div className="mx-8 hidden max-w-md flex-1 items-center lg:flex">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Tìm món ăn, nhà hàng..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {showMobileSearch && (
        <div className="mt-4 px-4 lg:hidden">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Tìm món ăn, nhà hàng..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
