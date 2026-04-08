import { When, Then, Before, DataTable } from '@cucumber/cucumber';
import { LocationPage } from '../pages/LocationPage';
import { expect } from '@playwright/test';

const locationPage = new LocationPage();
When('I navigate to the location page', async function (this: any) {
  await locationPage.navigateToLocationPage();
});

Then('verify the header of the location page is displayed', async function (this: any) {
  await locationPage.LocationHeaderverification();
});
Then('verify the {string} location is displayed on the location page', async function (this: any, locationName: string) {
  expect(await locationPage.verifylocationavailable(locationName)).toBe(true);
});

Then('verify user is not delete {string} location if employee assigned to that employee', async function (this: any, locationName: string) {
  await locationPage.deleteLocationWithEmployeeAssigned(locationName);
});

Then('verify the error message is displayed when user try to add duplicate location', async function (this: any,dataTable:DataTable) {
  const data=dataTable.raw().flat();
  await locationPage.addDuplicateLocation(data[0],data[1]);
});

Then('verify all buttons are displayed on the location page', async function (this: any) {
await locationPage.verifyAllButtonsDisplayed();
});

Then('verify user is able to add location successfully', async function (this: any,dataTable:DataTable) {
  const data=dataTable.raw().flat();
  await locationPage.addLocation(data[0],data[1]);
});

Then('verify user is able to edit location successfully', async function (this: any,dataTable:DataTable) {
  const data=dataTable.raw().flat();
  await locationPage.editLocation(data[0],data[1]);
});

Then('verify user is able to delete location successfully', async function (this: any,dataTable:DataTable) {
  const data=dataTable.raw().flat();
  await locationPage.deleteLocation(data[0]);
});

Then('user is able to add location successfully', async function (this: any,dataTable:DataTable) {
  const data=dataTable.raw().flat();
  await locationPage.addNewLocation(data[0],data[1]);
});

Then('verify user is able to search location successfully', async function (this: any,dataTable:DataTable) {
  const data=dataTable.raw().flat();
  await locationPage.searchLocation(data[0]);
});


