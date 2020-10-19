Feature: Consent
	As an Individual Participant
	I want to let the court know whether I consent to a video hearing or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4338 @Individual
Scenario: Consent
	Given the Individual has progressed to the Consent page
	Then contact details are available
	When attempts to click Save and continue without selecting an answer
	Then an error message appears stating 'Select if you would be content to take part in the hearing by video'
	When the user selects the 'No' radiobutton
	And attempts to click Save and continue without providing additional information
	Then an error message appears stating 'Enter your reasons for not consenting to a video hearing to help the court or tribunal decide'
	When the user answers yes to the consent question
	Then the user is on the Answers Saved Individual page
	When the user signs out 
	Then the answers have been stored

@VIH-4338 @Individual
Scenario: Consent - Individual gives reason for no consent
	Given the Individual has progressed to the Consent page
	When the user enters more details into the please provide more details of why you do not consent textfield
	Then the user is on the Answers Saved Individual page
	When the user signs out 
	Then the answers have been stored
