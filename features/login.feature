Feature: Login Functionality
  As a user
  I want to log in to the application
  So that I can access my account

  @smoke @critical
  Scenario: Successful login with valid credentials
    Given I am on the login page and enter valid credentials
    |Username                  |Password |
    |sumeet.thakur@abstechno.in|Bikash07@|
    Then I should be redirected to the dashboard page

