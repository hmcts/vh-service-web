Feature: Individual answers 'Interpeter' question
	As an Individual Participant
	I want to let the court know if I need an interpreter for a video hearing
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4333
Scenario: Interpreter Page - Individual participant attempts to proceed to next page without providing answer
	Given 'Individual' participant is on 'interpreter' page
	When Individual attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4333
Scenario: Individual participant provides additional information for video hearing suitability
	Given 'Individual' participant is on 'interpreter' page	
	When Individual provides answer as no
	And Individual proceeds to next page
	Then Individual should be on 'your-computer' screen