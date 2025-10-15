import type { CategoriesResponse } from "@/Models/Category";
import Image from "@/Components/Image";
import { useNavigate } from "react-router-dom";

const CardCategory = ({ item }: { item: CategoriesResponse }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/products?categoryId=${item.id}`);
  }
    return (
        <div
          onClick={handleDetail}
          key={item.id}
          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-3 h-28 w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={item?.img?.url}
              alt={item.name}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800">{item.name}</p>
            <svg
              className="h-5 w-5 text-gray-400 transition group-hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
    );
}

export default CardCategory;