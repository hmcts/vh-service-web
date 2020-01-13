Feature: About Your Computer
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: About Your Computer
	Given the Individual has progressed to the About Your Computer page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if the computer has a camera and microphone'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Your Internet Connection page

Scenario: About Your Computer - User drops out with No Answer
	Given the Individual has progressed to the About Your Computer page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
