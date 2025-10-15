import type { CategoriesResponse } from "@/Models/Category";
import { getAllCategoriesAPI } from "@/Services/CategoryService";
import { useEffect, useState } from "react";
import CardCategory from "./Card/CardCategory";

const Category = () => {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getAllCategoriesAPI();
        if (response && response.result) {
          setCategories(response.result);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    fetchCategories();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((item) => (
        <CardCategory item={item} key={item.id}/>
      ))}
    </div>
  );
};

export default Category;
