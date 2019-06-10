Feature: Individual answers 'Consent' question

	As an Individual Participant
	I want to let the court know whether I consent to a video hearing or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4338
Scenario: Individual participant consents to video hearing
	Given Individual participant is on 'consent' page
	When provides answer as Yes
	When proceeds to next page
	Then Individual should be on 'thank you' screen

@VIH-4338
Scenario: Individual participant attempts to proceed to next page without providing answer on consent page
	Given Individual participant is on 'consent' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as No
	And attempts to proceed without providing additional information
	Then 2 errors should be displayed
	When Individual provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 2 errors should be displayed

@VIH-4338
Scenario: Individual participant does not consent to video hearing
	Given Individual participant is on 'consent' page	
	When Individual provides additional information for not consenting to video hearing as 'ABC'
	And proceeds to next page
	Then Individual should be on 'thank you' screen