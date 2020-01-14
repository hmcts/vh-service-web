Feature: Your Internet Connection
	As an Individual Participant	
	I want to let the court know whether I have access to the internet or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4336
Scenario: Your Internet Connection
	Given the Individual has progressed to the Your Internet Connection page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if the computer will be able to access the internet at the time of the hearing'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Accesss to a Room page

@VIH-4336
Scenario: Your Internet Connection - User drops out with No Answer
	Given the Individual has progressed to the Your Internet Connection page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page