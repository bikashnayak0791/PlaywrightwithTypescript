Feature: Login Functionality
  As a user
  I want to log in to the application
  So that I can access my account

  Background:
    Given I navigate to "https://example.com/login"

  @smoke @critical
  Scenario: Successful login with valid credentials
    When I fill "input[name='username']" with "testuser@example.com"
    And I fill "input[name='password']" with "Test@1234"
    And I click on "button[type='submit']"
    Then the current URL should contain "/dashboard"

  @regression
  Scenario: Display error message with invalid credentials
    When I fill "input[name='username']" with "invalid@example.com"
    And I fill "input[name='password']" with "wrongpassword"
    And I click on "button[type='submit']"
    Then I should see element ".error-message"
    And I should see "Invalid credentials" in element ".error-message"

  @regression
  Scenario: Username is required
    When I fill "input[name='password']" with "Test@1234"
    And I click on "button[type='submit']"
    Then I should see element ".form-error"

  @regression
  Scenario: Password is required
    When I fill "input[name='username']" with "testuser@example.com"
    And I click on "button[type='submit']"
    Then I should see element ".form-error"

