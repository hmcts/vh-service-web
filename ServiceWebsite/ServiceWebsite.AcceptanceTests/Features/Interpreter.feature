Feature: Individual answers 'Interpeter' question
	As an Individual Participant
	I want to let the court know if I need an interpreter for a video hearing
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4333 @Individual
Scenario: Interpreter Page - Individual participant attempts to proceed to next page without providing answer
	Given Individual participant is on 'interpreter' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4333 @Individual
Scenario: Individual participant provides additional information for video hearing suitability
	Given Individual participant is on 'interpreter' page	
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'your computer' screen