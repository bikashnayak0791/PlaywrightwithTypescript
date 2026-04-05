export class DashboardpageTestData {
private static readonly Dashboardpage="Dashboard";

public static async getDashboardpage(): Promise<string> {
    return this.Dashboardpage;
  }
}