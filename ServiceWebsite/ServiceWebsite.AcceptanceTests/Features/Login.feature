Feature: Login
	As a registered video hearings user
	I would like to login and Logout
	So that I can access and sign out of the application

Scenario: Individual login
	Given a new browser is open for an Individual
	When the user logs in with valid credentials
	Then the user is on the About Hearings page
	When the user attempts to logout
	Then the user should be navigated to sign in screen

Scenario: Representative login
	Given a new browser is open for a Representative
	When the user logs in with valid credentials
	Then the user is on the Your Video Hearing page
	When the user attempts to logout
	Then the user should be navigated to sign in screen

@NoHearing
Scenario: Individual with no upcoming hearings is redirected to Video Web
	Given a new browser is open for an Individual
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

@VIH-4577 @Smoketest @Smoketest-Extended
Scenario: Individual completed checklist and self test redirected to Video Web
	Given a new browser is open for an Individual
	And Individual has already submitted checklist and self test
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

@VIH-4577 @Smoketest-Extended
Scenario: Representative completed checklist and self test redirected to Video Web
	Given a new browser is open for an Representative
	And Representative has already submitted checklist and self test
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

@Smoketest-Extended
Scenario: Judge redirected to Video Web
	Given a new browser is open for a Judge
	When the user logs in with valid credentials
	Then the user is redirected to Video Web