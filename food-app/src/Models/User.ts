export type UserProfileToken = {
  code: number;
   result: {
    access_token: string;
    refresh_token: string;
    nickName: string;
    email: string;
  };
};

export type UserProfile = {
  email: string;
  nickName: string;
};