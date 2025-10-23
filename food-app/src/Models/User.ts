export type UserProfileToken = {
  id: string;
  access_token: string;
  refresh_token: string;
  nickName: string;
  email: string;

  roles: RoleResponse[];
};

export type UserProfile = {
  id: string;
  email: string;
  nickName: string;
  role: string;
};

export type RoleResponse = {
  id: string;
  code: string;
  name: string;
};

export type RoleRequest = {
  code: string;
  name: string;
};

