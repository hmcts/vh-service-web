Feature: Representative answers 'Other Information' question
	As an representative Participant
	I want to let the court know whether I have any other information to provide
	So that the court can decide whether a video hearing is not suitable for me

@Representative
Scenario: Representative participant attempts to proceed to next page without providing answer on Other Information page
	Given Representative participant is on 'other information' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as Yes
	And attempts to proceed without providing additional information
	Then 1 error should be displayed
	When provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 1 error should be displayed

@Representative
Scenario: Representative participant has additional information
	Given Representative participant is on 'other information' page	
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'answers saved' screen
