Feature: Individual answers 'Your computer' question
	As an Individual Participant
	I want to let the court know whether I have a computer or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4334
Scenario: Individual participant does not own a computer
	Given Individual participant is on 'your computer' page
	And Hearing due date is in the future
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'thank you' screen

 @VIH-4334
Scenario: Individual participant owns a computer
	Given Individual participant is on 'your computer' page	
	When provides answer as Yes
	And proceeds to next page
	Then Individual should be on 'about your computer' screen

@VIH-4334
Scenario: Your Computer Page - Individual participant attempts to proceed to next page without providing answer
	Given Individual participant is on 'your computer' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4433
Scenario: Representative participant owns a computer
	Given Representative participant is on 'your computer' page	
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'about your computer' screen

@VIH-4433
Scenario: Your Computer Page - Representative participant attempts to proceed to next page without providing answer
	Given Representative participant is on 'your computer' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed