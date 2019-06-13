Feature: Representative Answers About Your Client Question
	As a Participant
	I want to be able to tell the court if there is anything that could affect client's ability to take part in video hearing
	So that the court can make an informed decision based on my circumstances

@smoketest @VIH-4440
Scenario: Representative participant attempts to proceed to next page without providing answer on About Your Client page
	Given Representative participant is on 'about your client' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as Yes
	And attempts to proceed without providing additional information
	Then 1 error should be displayed
	When provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 1 error should be displayed

@smoketest @VIH-4440
Scenario: Representative participant provides additional information for video hearing suitability on about your client page
	Given Representative participant is on 'about your client' page
	When provides additional information 'ABC'
	And proceeds to next page
	Then Representative should be on 'client attendance' screen
