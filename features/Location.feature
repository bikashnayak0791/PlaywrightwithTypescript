Feature: Location Functionality
    As a user
    I want to be able to access location-based features
    So that I can get relevant information based on my location

  Background:
    Given I am on the login page and enter valid credentials
      | Username                   | Password  |
      | sumeet.thakur@abstechno.in | Bikash07@ |

  Scenario: Accessing location-based features
    When I navigate to the location page
    Then verify the header of the location page is displayed
    And verify the "Karnataka" location is displayed on the location page
    And verify user is not delete "Karnataka" location if employee assigned to that employee
    And verify the error message is displayed when user try to add duplicate location
    |Karnataka|Systeminfo123|
    And verify all buttons are displayed on the location page
    And verify user is able to add location successfully
    |Kolkta|Systeminfo Kolkata|
    And verify user is able to edit location successfully
    |Kolkta|Systeminfo Kolkata Updated||
    And verify user is able to delete location successfully
    |Kolkta|
    And user is able to add location successfully
    |Hydrabad|Systeminfo Hyderabad|
    And verify user is able to search location successfully
    |Hydrabad|
