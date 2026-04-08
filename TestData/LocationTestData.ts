
export class LocationTestData {
private static readonly locationHeaders: string[] = ["Sl No.", "Location Name", "System Info", "No of Employees", "Created Date", "Status", "Action"];
private static readonly errormessage="Cannot delete location: employees are assigned to this location.";
private static readonly duplicateErrorMessage = "Unable to save: this location already exists.";
private static readonly successMessage = "Location added successfully.";
private static readonly editSuccessMessage = "Location updated successfully.";
private static readonly deleteSuccessMessage = "Location deleted successfully.";

public static async getLocationHeaders(): Promise<string[]> {
    return this.locationHeaders;
  }
public static async getErrorMessage(): Promise<string> {
    return this.errormessage;
  }
public static async getDuplicateErrorMessage(): Promise<string> {
    return this.duplicateErrorMessage;
  }
public static async getSuccessMessage(): Promise<string> {
    return this.successMessage;
  }
public static async getEditSuccessMessage(): Promise<string> {
    return this.editSuccessMessage;
  }
public static async getDeleteSuccessMessage(): Promise<string> {
    return this.deleteSuccessMessage;
  }
}