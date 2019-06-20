Feature: Participant Answers About You Question
	As an Participant
	I want to be able to tell the court if there is any reason I don't think  am suitable
	So that the court can make an informed decision based on my circumstances

@smoketest @VIH-4332
Scenario: Individual participant attempts to proceed to next page without providing answer on About You page
	Given Individual participant is on 'about you' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as Yes
	And attempts to proceed without providing additional information
	Then 1 error should be displayed
	When provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 1 error should be displayed

@smoketest @VIH-4332
Scenario: Individual participant provides additional information for video hearing suitability
	Given Individual participant is on 'about you' page
	When provides additional information 'ABC'
	And proceeds to next page
	Then Individual should be on 'interpreter' screen

@VIH-4430
Scenario: Representative participant attempts to proceed to next page without providing answer on About You page
	Given Representative participant is on 'about you' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as Yes
	And attempts to proceed without providing additional information
	Then 1 error should be displayed
	When provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 1 error should be displayed

 @VIH-4332
Scenario: Representative participant provides additional information for video hearing suitability
	Given Representative participant is on 'about you' page
	When provides additional information 'ABC'
	And proceeds to next page
	Then Representative should be on 'access to a suitable room' screen

	