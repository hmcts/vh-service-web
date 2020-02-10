Feature: Presenting the Case
	As an representative Participant
	I want to let the court know whether I have a person presenting the case
	So that the court can decide whether a video hearing is not suitable for me

Scenario: Presenting the Case
	Given the Representative has progressed to the Presenting the Case page
	Then contact details are available
	And the hearing details are displayed correctly
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select who'll be presenting the case'
	When the user selects the 'Someone else will be presenting the case' radiobutton
	And adds details of who will be presenting the case
	And the user clicks the Continue button
	Then the user is on the Other Information page
	When the user signs out 
	Then the answers have not been stored
