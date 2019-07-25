Feature: Individual answers 'Microphone Working' question
	As a Participant
	I want to let the court know if my camera was working during self-test
	So that the court can decide whether a video hearing is not suitable for me

@VIH-3940
Scenario: Individual participant attempts to proceed to next page without providing answer on Camera Working Page
	Given Individual participant is on 'microphone working' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-3940
Scenario: Individual participant provides additional information for video hearing suitability on Camera Working Page
	Given Individual participant is on 'microphone working' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'video working' screen

@VIH-4517
Scenario: Representative participant attempts to proceed to next page without providing answer on Camera Working Page
	Given Representative participant is on 'microphone working' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4517
Scenario: Representative participant provides additional information for video hearing suitability on Camera Working Page
	Given Representative participant is on 'microphone working' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'video working' screen