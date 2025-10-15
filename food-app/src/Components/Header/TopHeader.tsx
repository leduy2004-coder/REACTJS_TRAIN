import { useEffect, useRef, useState } from "react";
import { UserAuth } from "@/Context/UserContext";
import { Link } from "react-router-dom";

const TopHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, logout } = UserAuth();

   // Khi click ra ngoài -> đóng menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[rgb(206,196,43)] px-4 py-2 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-sm transition-colors hover:text-gray-200">
            About Us
          </a>
          <a href="#" className="text-sm transition-colors hover:text-gray-200">
            Customer Support
          </a>
        </div>

        {/* Center - App download message */}
        <div className="text-sm">
          Shop on the go, download our app. Details.
        </div>

        {/* Right side - User menu */}
        <div ref={menuRef} className="relative">
          <div className="flex items-center space-x-2">
            {user && (
              <span className="text-sm font-medium text-white">
                {user.nickName}
              </span>
            )}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1 transition-colors hover:text-gray-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
              {isLoggedIn() ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Trang cá nhân
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng nhập
                  </Link>

                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
