Feature: Access To a Room
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Access To a Room
	Given the Individual has progressed to the Access To a Room page
	Then contact details are available
	And the hearing date is displayed correctly
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you’ll have access to a laptop or desktop computer'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Consent page

Scenario: Access To a Room - User drops out with No Answer
	Given the Individual has progressed to the Access To a Room page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
