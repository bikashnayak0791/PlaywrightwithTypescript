export class TestData {
  private static readonly VALID_USERNAME = 'testuser@example.com';
  private static readonly VALID_PASSWORD = 'Test@1234';
  private static readonly INVALID_USERNAME = 'invalid@example.com';
  private static readonly INVALID_PASSWORD = 'wrongpassword';
  private static readonly TEST_TIMEOUT = 30000;


  public static getValidUsername(): string {
    return this.VALID_USERNAME;
  }

  public static getValidPassword(): string {
    return this.VALID_PASSWORD;
  }

  public static getInvalidUsername(): string {
    return this.INVALID_USERNAME;
  }

  public static getInvalidPassword(): string {
    return this.INVALID_PASSWORD;
  }

  public static getTestTimeout(): number {
    return this.TEST_TIMEOUT;
  }
}
