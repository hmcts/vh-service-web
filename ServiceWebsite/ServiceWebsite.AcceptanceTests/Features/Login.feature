Feature: Login
	As a registered video hearings user
	I would like to login and Logout
	So that I can access and sign out of the application

@Individual
Scenario: Individual login
	Given a new browser is open for an Individual
	When the user logs in with valid credentials
	Then the user is on the Checking Video Hearing page
	#When the user attempts to logout
	When the user signs out
	Then the user is on the logout page

@Representative
Scenario: Representative login
	Given a new browser is open for a Representative
	When the user logs in with valid credentials
	Then the user is on the Checking Video Hearing page
	When the user attempts to logout
	Then the user is on the logout page

@NoHearing @Individual
Scenario: Individual with no upcoming hearings is redirected to Video Web
	Given a new browser is open for an Individual
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

@VIH-4577 @Individual @Smoketest @Smoketest-Extended
Scenario: Individual completed checklist and self test redirected to Video Web
	Given a new browser is open for an Individual
	And Individual has already submitted checklist and self test
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

@VIH-4577 @Representative @Smoketest-Extended
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

@VIH-4577 @PanelMember
Scenario: Panel member redirected to Video Web
	Given a new browser is open for a Panel Member
	When the user logs in with valid credentials
	Then the user is redirected to Video Web

@VIH-4577 @Winger
Scenario:  Winger redirected to Video Web
	Given a new browser is open for a Winger
	When the user logs in with valid credentials
	Then the user is redirected to Video Web