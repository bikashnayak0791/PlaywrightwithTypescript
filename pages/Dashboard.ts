import { expect, Page } from "@playwright/test";
import { DashboardpageTestData } from "../TestData/DashboardpageTestData";

export class Dashboard {
    page: Page;
    dashboardheader="//h4[normalize-space()='Dashboard']";
    constructor(page:Page){
        this.page=page;
    }
    public async verifydashboard(){
        let text = await this.page.locator(this.dashboardheader).innerText();
        await expect(text).toEqual(await DashboardpageTestData.getDashboardpage());
    }
}