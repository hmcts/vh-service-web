Feature: Consent
	As an Individual Participant
	I want to let the court know whether I consent to a video hearing or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4338
Scenario: Consent
	Given the Individual has progressed to the Consent page
	Then contact details are available
	When attempts to click Save and continue without selecting an answer
	Then an error message appears stating 'Select if you would be content to take part in the hearing by video'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Check Your Computer page

@VIH-4338
Scenario: Consent - User drops out with No Answer
	Given the Individual has progressed to the Consent page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
