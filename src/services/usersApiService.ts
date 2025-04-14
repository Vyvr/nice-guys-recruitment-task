import { User } from "@/types/userModel";

export class UsersApiService {
  private static API_URL = "https://jsonplaceholder.typicode.com";

  public static async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data: User[] = await response.json();

    // Na potrzebę zachowania lokalnych użytkowników i pobierania zaktualizowanych z bazy
    const usersWithFlag = data.map((user) => ({
      ...user,
      address: { ...user.address },
      isLocal: false,
    }));

    return usersWithFlag;
  }
}
