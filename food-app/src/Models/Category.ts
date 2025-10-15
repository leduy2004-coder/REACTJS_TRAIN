export type CategoryImage = {
  id: string;
  publicId: string;
  url: string;
};

export type Category = {
  id: string;
  name: string;
  img?: CategoryImage | null;
};

export type CategoryCreateRequest = {
  name: string;
};

export type CategoriesResponse = Category;


