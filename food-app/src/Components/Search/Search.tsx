import type { ChangeEvent, SyntheticEvent } from "react";

type Props = {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variant?: 'navbar' | 'fullpage';
}

const Search = ({ onSearchSubmit, search, handleSearchChange, variant = 'fullpage' }: Props) => {
  // Navbar variant - compact search input for header
  if (variant === 'navbar') {
    return (
      <div className="relative">
        <form onSubmit={onSearchSubmit} className="relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" 
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
              className="w-full pl-10 pr-4 py-2 text-gray-900 border border-gray-300 rounded-lg 
                       bg-white focus:outline-none focus:ring-2 focus:ring-white 
                       focus:border-white transition-all duration-200 placeholder-gray-400"
              id="search-input"
              placeholder="Tìm món ăn, nhà hàng..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>
    );
  }

  // Fullpage variant - complete search section
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tìm kiếm món ăn</h2>
          <p className="text-gray-600">Khám phá những món ăn ngon và đa dạng</p>
        </div>
        
        <form
          className="relative max-w-2xl mx-auto"
          onSubmit={onSearchSubmit}
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" 
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
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl 
                       bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 
                       focus:border-indigo-500 transition-all duration-200 placeholder-gray-400
                       hover:shadow-xl hover:border-gray-300"
              id="search-input"
              placeholder="Nhập tên món ăn, nhà hàng hoặc địa điểm..."
              value={search}
              onChange={handleSearchChange}
            />
            
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 
                       bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 
                       rounded-lg font-medium transition-all duration-200 
                       hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Tìm kiếm
            </button>
          </div>
          
          {/* Popular searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-gray-500">Tìm kiếm phổ biến:</span>
            {['Pizza', 'Bún bò', 'Phở', 'Gà rán', 'Sushi'].map((item) => (
              <button
                key={item}
                type="button"
                className="px-3 py-1 text-sm bg-white text-gray-600 rounded-full 
                         border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 
                         transition-all duration-200 hover:shadow-md"
                onClick={() => handleSearchChange({ target: { value: item } } as ChangeEvent<HTMLInputElement>)}
              >
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;