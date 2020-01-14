Feature: Interpreter
	As an Individual Participant
	I want to let the court know if I need an interpreter for a video hearing
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4333
Scenario: Interpreter
	Given the Individual has progressed to the Interpreter page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you would need an interpreter for the hearing'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Interpreter page
