export class AuthService {
  private static ADMIN_USERNAME = "admin";
  private static ADMIN_PASSWORD = "admin";

  public static login(username: string, password: string): boolean {
    return username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD;
  }
}
