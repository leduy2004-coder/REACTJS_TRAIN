export type UserProfileToken = {
  access_token: string;
  refresh_token: string;
  nickName: string;
  email: string;

  roles: RoleResponse[];
};

export type UserProfile = {
  email: string;
  nickName: string;
  role: string;
};

export type RoleResponse = {
  id: string;
  code: string;
  name: string;
};
