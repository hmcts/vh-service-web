Feature: Error Pages
	As a registered video hearings user
	I would expect information error messages when things go wrong
	So that I know how to resolve the issue

@UnsupportedBrowser
Scenario: Unsupported browser error page
	Given a new browser is open for an Individual
	When the user attempts to access the page on their unsupported browser
	Then the user is on the Unsupported Browser error page with text of how to rectify the problem

Scenario: Page not found error
	Given a new browser is open for an Individual
	When the user logs in with valid credentials
	Then the user is on the About Hearings page
	When the user attempts to navigate to a nonexistent page
	Then the user is on the Not Found page
	And the Not Found error page displays text of how to rectify the problem
	And contact details are available