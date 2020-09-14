Feature: About You
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@VIH-4332
Scenario: About You
	Given the Individual has progressed to the About You page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if there’s anything you’d like the court or tribunal to take into account'
	When the user selects the 'Yes' radiobutton
	And attempts to click Continue without providing additional information
	Then an error message appears stating 'Enter any information to help the court or tribunal decide'
	When the user enters more details into the please provide more details textfield
	Then the user is on the Interpreter page
	When the user signs out 
	Then the answers have not been stored
	