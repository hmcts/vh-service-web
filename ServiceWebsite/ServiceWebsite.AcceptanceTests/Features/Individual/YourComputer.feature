Feature: Your Computer
	As an Individual Participant
	I want to let the court know whether I have a computer or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4334
Scenario: Your Computer
	Given the Individual has progressed to the Your Computer page
	Then contact details are available
	And the hearing date is displayed correctly
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you’ll have access to a laptop or desktop computer'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the About Your Computer page

@VIH-4334
Scenario: Your Computer - User drops out with No Answer
	Given the Individual has progressed to the Your Computer page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
