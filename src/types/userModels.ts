export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
}

export type UserBasicData = Pick<User, "id" | "name" | "username">;
