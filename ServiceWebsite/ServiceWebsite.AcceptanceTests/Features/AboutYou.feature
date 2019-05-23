Feature: Individual Answers About You Question
	As an Individual Participant
	I want to be able to tell the court if there is any reason I don't think  am suitable
	So that the court can make an informed decision based on my circumstances

@smoketest @VIH-4332
Scenario: Individual participant attempts to proceed to next page without providing answer on About You page
	Given 'Individual' participant is on 'about you' page
	When Individual attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When Individual provides answer as Yes
	And Individual attempts to proceed without providing additional information
	Then 2 errors should be displayed
	When Individual provides additional information containing a two character length 'AB'
	And Individual proceeds to next page
	Then 2 errors should be displayed

@smoketest @VIH-4332
Scenario: Individual participant provides additional information for video hearing suitability
	Given 'Individual' participant is on 'about you' page	
	When Individual provides additional information 'ABC'
	And Individual proceeds to next page
	Then Individual should be on 'interpreter' screen