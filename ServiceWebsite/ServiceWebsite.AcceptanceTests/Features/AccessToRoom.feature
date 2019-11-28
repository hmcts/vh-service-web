Feature: Participant answers 'A quiet room' question
	As a Participant	
	I want to let the court know whether I have access to a suitable room or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4337 @Individual
Scenario: Individual participant does not have access to a room at the time of hearing
	Given Individual participant is on 'access to a room' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'consent' screen

 @VIH-4337 @Individual
Scenario: Individual participant has access to a room at the time of hearing
	Given Individual participant is on 'access to a room' page	
	When provides answer as Yes
	And proceeds to next page
	Then Individual should be on 'consent' screen

@VIH-4337 @Individual
Scenario: Access To A Room Page - Individual participant attempts to proceed to next page without providing answer
	Given Individual participant is on 'access to a room' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed