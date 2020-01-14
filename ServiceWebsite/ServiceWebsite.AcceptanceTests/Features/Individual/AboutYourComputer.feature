Feature: About Your Computer
	As an Individual Participant
	I want to let the court know whether my computer has a camera and microphone or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4335
Scenario: About Your Computer
	Given the Individual has progressed to the About Your Computer page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if the computer has a camera and microphone'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Your Internet Connection page

@VIH-4335
Scenario: About Your Computer Not Sure
	Given the Individual has progressed to the About Your Computer page
	When the user selects the 'Not sure' radiobutton
	And the user clicks the Continue button
	Then the user is on the Your Internet Connection page

@VIH-4335
Scenario: About Your Computer - User drops out with No Answer
	Given the Individual has progressed to the About Your Computer page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
