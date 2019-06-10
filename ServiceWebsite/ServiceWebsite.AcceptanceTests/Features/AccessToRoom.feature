Feature: Individual answers 'A quiet room' question
	As an Individual Participant	
	I want to let the court know whether I have access to a suitable room or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4337
Scenario: Individual participant does not have access to a room at the time of hearing
	Given Individual participant is on 'access to a room' page
	When Individual provides answer as No
	And Individual proceeds to next page
	Then Individual should be on 'consent' screen

 @VIH-4337
Scenario: Individual participant has access to a room at the time of hearing
	Given Individual participant is on 'access to a room' page	
	When Individual provides answer as Yes
	And Individual proceeds to next page
	Then Individual should be on 'consent' screen

@VIH-4337
Scenario: Access To A Room Page - Individual participant attempts to proceed to next page without providing answer
	Given Individual participant is on 'access to a room' page
	When Individual attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4432 @smoketest
Scenario: Access To A Room Page - Representative participant attempts to proceed to next page without providing answer
	Given Representative participant is on 'access to a room rep' page
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'consent' screen
