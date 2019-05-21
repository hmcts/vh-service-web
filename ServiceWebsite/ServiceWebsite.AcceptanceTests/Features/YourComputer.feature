Feature: Individual answers 'Your computer' question
	As an Individual Participant
	I want to let the court know whether I have a computer or not
	So that the court can decide whether a video hearing is not suitable for me

@VIH-4334
Scenario: Individual participant does not own a computer
	Given 'Individual' participant is on 'your computer' page
	And Hearing due date is in the future
	When Individual provides answer as no
	And Individual proceeds to next page
	Then Individual should be on 'thank you' screen

@smoketest @VIH-4334
Scenario: Individual participant owns a computer
	Given 'Individual' participant is on 'your computer' page	
	When Individual provides answer as yes
	And Individual proceeds to next page
	Then Individual should be on 'about your computer' screen

@VIH-4334
Scenario: Your computer Page - Individual participant attempts to proceed to next page without providing answer
	Given 'Individual' participant is on 'your computer' page
	When Individual attempts to proceed without selecting an answer
	Then 1 error should be displayed