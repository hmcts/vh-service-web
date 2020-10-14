Feature: Access To a Room
	As a Participant	
	I want to let the court know whether I have access to a suitable room or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4337 @Individual
Scenario: Access To a Room
	Given the Individual has progressed to the Access To a Room page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you’ll have access to a quiet, private room'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Consent page
	When the user signs out 
	Then the answers have not been stored
