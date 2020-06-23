Feature: Sign In On Computer
	In order to enable users to conduct some of the checklist on a mobile devive
	As a service web user
	I want to be informed I need to sign in on the device reuired on the day

@VIH-5758 @NotDesktop
Scenario: Individual Sign In On Computer
	Given the Individual has progressed to the Your Computer page
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Sign In On Computer page
	And the page displays details about signing in on a computer

@VIH-5758 @NotDesktop
Scenario: Representative Sign In On Computer
	Given the Representative has progressed to the Answers Saved page
	When the user clicks the Check my computer button
	Then the user is on the Sign In On Computer page
	And the page displays details about signing in on a computer
