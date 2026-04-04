import { Page, expect } from '@playwright/test';

export class UIHelpers {
  static async waitAndClick(page: Page, selector: string) {
    await page.waitForSelector(selector);
    await page.click(selector);
  }

  static async fillAndVerify(page: Page, selector: string, text: string) {
    const inputField = page.locator(selector);
    await inputField.fill(text);
    expect(inputField).toHaveValue(text);
  }

  static async getTableData(page: Page, tableSelector: string) {
    const rows = page.locator(`${tableSelector} tbody tr`);
    const rowCount = await rows.count();
    const data = [];

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = row.locator('td');
      const cellCount = await cells.count();
      const rowData = [];

      for (let j = 0; j < cellCount; j++) {
        const cellText = await cells.nth(j).textContent();
        rowData.push(cellText);
      }
      data.push(rowData);
    }
    return data;
  }

  static async switchToFrame(page: Page, frameSelector: string) {
    const frameHandle = page.locator(frameSelector);
    return frameHandle.frameLocator('iframe');
  }

  static async captureScreenshot(page: Page, filename: string) {
    await page.screenshot({ path: `./reports/screenshots/${filename}.png` });
  }
}
