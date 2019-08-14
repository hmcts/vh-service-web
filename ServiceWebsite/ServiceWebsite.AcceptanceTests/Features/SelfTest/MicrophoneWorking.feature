Feature: Individual answers 'Microphone Working' question
	As a Participant
	I want to let the court know if my camera was working during self-test
	So that the court can decide whether a video hearing is not suitable for me

@VIH-3940 @IndividualSelfTest
Scenario: Individual participant attempts to proceed to next page without providing answer on Microphone Working page
	Given Individual participant is on 'microphone working' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-3940 @IndividualSelfTest
Scenario: Individual participant clicks Check My Equipment button on Microphone Working page
	Given Individual participant is on 'microphone working' page
	When clicks Check My Equipment button
	Then Individual should be on 'test your equipment' screen

@VIH-3940 @IndividualSelfTest
Scenario: Individual participant provides additional information for video hearing suitability on Microphone Working page
	Given Individual participant is on 'microphone working' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'video working' screen

@VIH-4517 @RepresentativeSelfTest
Scenario: Representative participant attempts to proceed to next page without providing answer on Microphone Working page
	Given Representative participant is on 'microphone working' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4517 @RepresentativeSelfTest
Scenario: Representative participant clicks Check My Equipment button on Microphone Working page
	Given Representative participant is on 'microphone working' page
	When clicks Check My Equipment button
	Then Representative should be on 'test your equipment' screen

@VIH-4517 @RepresentativeSelfTest
Scenario: Representative participant provides additional information for video hearing suitability on Microphone Working page
	Given Representative participant is on 'microphone working' page
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'video working' screen