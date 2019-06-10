Feature: Individual answers 'Your internet connection' question
	As an Individual Participant	
	I want to let the court know whether I have access to the internet or not
	So that the court can decide whether a video hearing is not suitable for me

@smoketest @VIH-4336
Scenario: Individual participant will not be able to access the internet at the time of hearing
	Given Individual participant is on 'your internet connection' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'thank you' screen

 @VIH-4336
Scenario: Individual participant will have internet access at the time of hearing
	Given Individual participant is on 'your internet connection' page	
	When provides answer as Yes
	And proceeds to next page
	Then Individual should be on 'access to a room' screen

@VIH-4336
Scenario: Your Internet Connection Page - Individual participant attempts to proceed to next page without providing answer
	Given Individual participant is on 'your internet connection' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed