export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imgUrl?: CloudinaryResponse[];
  categoryId: string;
};
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
  categoryId: string;
  imgUrl: CloudinaryResponse[];

  user: ProfileGetResponse;
};

export type ProfileGetResponse = {
  email: string;
  nickName: string;
  id: string;
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
