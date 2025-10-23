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
import { createCommentAPI, getCommentByProductIdAPI, deleteCommentAPI } from "./CommentService";
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
  createCommentAPI,
  getCommentByProductIdAPI,
  deleteCommentAPI,
};

export default config;
