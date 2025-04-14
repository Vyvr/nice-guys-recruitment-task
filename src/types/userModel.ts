export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
}

export type UserBasicData = Pick<User, "id" | "name" | "username">;
