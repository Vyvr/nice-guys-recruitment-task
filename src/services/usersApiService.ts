import { User } from "@/types/userModel";

export class UsersApiService {
  private static API_URL = "https://jsonplaceholder.typicode.com";

  public static async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  }
}
