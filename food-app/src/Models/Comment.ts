export type CommentCreateRequest = {
  productId: string;
  comment: string;
  parentId?: string;
};

export type CommentCreateResponse = {
  id: string;
  productId: string;
  comment: string;
  parentId: string;
  created: string;
};

export type CommentGetResponse = {
  id: string;
  comment: string;
  parentId: string;
  created: string;
  user: ProfileGetResponse;
};

export type ProfileGetResponse = {
  id: string;
  nickName: string;
  email: string;
};

