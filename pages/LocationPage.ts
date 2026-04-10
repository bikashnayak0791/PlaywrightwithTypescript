import { Page, expect } from "@playwright/test";
import { LocationTestData } from "../TestData/LocationTestData";
import { BrowserManager } from "../Config/BrowserManager";
import { InitializedException } from "../ExceptionUtil/InitializedException";

export class LocationPage {
  private readonly sidebarbutton = "//i[@class='sl-icon-menu font-20']";
  private readonly setting = "//span[normalize-space()='Settings']";
  private readonly location = 'a:has-text("Locations")';
  private readonly locationheader = "//table[@id='example']//th";
  private readonly locationavailable = "table#example tbody tr";
  private readonly locationname = "td:nth-child(2)";
  private readonly locationDeletebutton = "td:nth-child(7) a:nth-child(2)";
  private readonly locationEditbutton = "td:nth-child(7) a:nth-child(1)";
  private readonly systemInfo = "td:nth-child(3)";
  private readonly message = "//div[@role='alert']";
  private readonly messageclosebutton = "button[type='button']";
  private readonly numberofemployeeassign = "td:nth-child(4)";
  private readonly addButton =
    "//a[@class='buttons-copy buttons-html5 btn btn-primary mr-1 mb-2']";
  private readonly locationinput = "input#location";
  private readonly systeminfo = "input#system_info";
  private readonly Addmorebutton = ".btn.btn-info.waves-effect.waves-light";
  private readonly savebutton = "//button[normalize-space()='Save']";
  private readonly updatebutton = "//button[normalize-space()='Update']";
  private readonly cancel = "//a[normalize-space()='Cancel']";
  private readonly resetbutton = "//button[normalize-space()='Reset']";
  private readonly locationremovebutton =
    "//button[@class='btn btn-danger waves-effect waves-light']";
  private readonly locationlistpage = "//li[@class='breadcrumb-item active']";
  private readonly systeminfotooltip = "input[name='systemInfo']";
  private readonly searchfilter = "input[type='search']";

  private get page() {
    const p = BrowserManager.getPage();
    if (!p)
      throw new InitializedException(
        "Page not initialized. Call PlaywrightManager.initBrowser() first.",
      );
    return p;
  }

  public async navigateToLocationPage() {
    await this.page.locator(this.sidebarbutton).click();
    await this.page.locator(this.setting).click();
    await this.page.locator(this.location).click();
  }
  public async LocationHeaderverification() {
    const heaerElements: string[] = await this.page
      .locator(this.locationheader)
      .allInnerTexts();
    const expectedHeaders: string[] =
      await LocationTestData.getLocationHeaders();
    const ismatch =
      heaerElements.length === expectedHeaders.length &&
      heaerElements.every(
        (header, index) => header.trim() === expectedHeaders[index],
      );
    expect(ismatch).toBe(true);
  }
  public async verifylocationavailable(locationname: string) {
    const rows = await this.page.locator(this.locationavailable);
    const getallocationnames = await rows
      .locator(this.locationname)
      .allInnerTexts();
    const ismatch = getallocationnames.some(
      (name) => name.trim() === locationname,
    );
    return ismatch;
  }
  public async deleteLocationWithEmployeeAssigned(locationname: string) {
    if ((await this.verifylocationavailable(locationname)) == true) {
      const row = this.page
        .locator(this.locationavailable)
        .filter({ hasText: locationname });
      const employeeCountText = await row
        .locator(this.numberofemployeeassign)
        .innerText();
      const employeeCount = parseInt(employeeCountText.trim()) || 0;
      if (employeeCount > 0) {
        this.page.once("dialog", async (dialog) => {
          await dialog.accept();
        });
        await row.locator(this.locationDeletebutton).click();
        await expect(this.page.locator(this.message)).toContainText(
          await LocationTestData.getErrorMessage(),
        );
      }
    }
    
  }
  public async addDuplicateLocation(locationName: string, systemInfo: string) {
    if ((await this.verifylocationavailable(locationName)) == true) {
      await this.addLocation(locationName, systemInfo);
      await expect(this.page.locator(this.message)).toContainText(
        await LocationTestData.getDuplicateErrorMessage(),
      );
    }
    await this.page.locator(this.messageclosebutton).click();
  }

  public async addLocation(locationName: string, systemInfo: string) {
      await this.page.locator(this.addButton).click();
      await this.page.locator(this.locationinput).fill(locationName);
      await this.page.locator(this.systeminfo).fill(systemInfo);
      await this.page.locator(this.savebutton).click();
  }
  public async addNewLocation(locationName: string, systemInfo: string) {
    if((await this.verifylocationavailable(locationName))==false){
    await this.addLocation(locationName, systemInfo);
  }
}
  public async editLocation(locationName: string, newSystemInfo: string) {
    if ((await this.verifylocationavailable(locationName)) == true) {
      const row = this.page
        .locator(this.locationavailable)
        .filter({ hasText: locationName });
      await row.locator(this.locationEditbutton).click();
      await this.page.locator(this.locationinput).clear();
      await this.page.locator(this.locationinput).fill(locationName);
      await this.page.locator(this.systeminfo).clear();
      await this.page.locator(this.systeminfo).fill(newSystemInfo);
      await this.page.locator(this.updatebutton).click();
    }
    await this.page.locator(this.messageclosebutton).click();
  }
  public async deleteLocation(locationName: string) {
    const row = this.page
      .locator(this.locationavailable)
      .filter({ hasText: locationName });
    const employeeCountText = await row
      .locator(this.numberofemployeeassign)
      .innerText();
    const employeeCount = parseInt(employeeCountText.trim()) || 0;
    if (employeeCount === 0) {
      this.page.once("dialog", async (dialog) => {
        await dialog.accept();
      });
      await row.locator(this.locationDeletebutton).click();
    }
    await this.page.locator(this.messageclosebutton).click();
  }
  public async verifyAllButtonsDisplayed() {
    await expect(this.page.locator(this.addButton)).toBeVisible();
    await this.page.locator(this.addButton).click();
    await expect(this.page.locator(this.savebutton)).toBeVisible();
    await expect(this.page.locator(this.cancel)).toBeVisible();
    await expect(this.page.locator(this.resetbutton)).toBeVisible();
    await this.page.locator(this.cancel).click();
    await expect(this.page.locator(this.locationlistpage)).toBeVisible();
  }
  public async searchLocation(searchTerm: string) {
    await this.page.locator(this.searchfilter).fill(searchTerm);
    const rows = await this.page.locator(this.locationavailable).innerText();
    await expect(rows).toContain(searchTerm);
  }
  public async buttonfunctionalityverification() {

  }
}
