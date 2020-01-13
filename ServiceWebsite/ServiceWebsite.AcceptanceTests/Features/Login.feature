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

@VIH-4577 @Individual
Scenario: Individual without computer submits questionnaire is redirected to Video Web
	Given Individual participant has already submitted questionnaire but drops out
	And a new browser is open for an Individual
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

Scenario: Clerk login denied
	Given a new browser is open for a Clerk
	When the user logs in with valid credentials
	Then the user is on the Unauthorised page

Scenario: Case admin login denied
	Given a new browser is open for a Participant
	When the user logs in with valid credentials
	Then the user is on the Unauthorised page