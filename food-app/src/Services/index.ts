import { loginAPI, registerAPI, logoutAPI } from "./AuthService";
import { createCategoryAPI, getAllCategoriesAPI } from "./CategoryService";
import {
  getAllProduct,
  getAllProductByCategory,
  getMyProductsAPI,
  createProductAPI,
  deleteProductAPI,
  updateImageAPI,
  updateProductAPI,
} from "./ProductService";
const config = {
  loginAPI,
  registerAPI,
  logoutAPI,
  createCategoryAPI,
  getAllCategoriesAPI,
  getAllProduct,
  getAllProductByCategory,
  getMyProductsAPI,
  createProductAPI,
  deleteProductAPI,
  updateImageAPI,
  updateProductAPI,
};

export default config;
