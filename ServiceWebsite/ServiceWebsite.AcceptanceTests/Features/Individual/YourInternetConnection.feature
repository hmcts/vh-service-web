Feature: Your Internet Connection
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Your Internet Connection
	Given the Individual has progressed to the Your Internet Connection page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if the computer will be able to access the internet at the time of the hearing'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Accesss to a Room page

Scenario: Your Internet Connection - User drops out with No Answer
	Given the Individual has progressed to the Your Internet Connection page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page