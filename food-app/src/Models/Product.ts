export type ProductCreateRequest = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

export type ProductCreateResponse = {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductGetResponse = {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryName: string;
  images: CloudinaryResponse[];
};

export type ProductUpdateRequest = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type ProductUpdateImageRequest = {
  productId: string;
};

export type CloudinaryResponse = {
  url: string;
  publicId: string;
  id: string;
};

