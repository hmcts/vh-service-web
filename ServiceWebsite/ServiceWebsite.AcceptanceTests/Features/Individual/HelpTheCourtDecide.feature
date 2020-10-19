Feature: Help the Court Decide
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Individual
Scenario: Help the Court Decide
	Given the Individual has progressed to the Help the Court Decide page
	Then contact details are available
	When the user clicks the Continue to questions button
	Then the user is on the About you page
	When the user signs out 
	Then the answers have not been stored