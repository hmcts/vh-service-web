Feature: Individual answers 'About Your Computer' question
	As an Individual Participant
	I want to let the court know whether my computer has a camera and microphone or not
	So that the court can decide whether a video hearing is not suitable for me

@smoketest @VIH-4335
Scenario: Individual participant computer has no camera and microphone
	Given 'Individual' participant is on 'about your computer' page
	When Individual provides answer as no
	And Individual proceeds to next page
	Then Individual should be on 'thank you' screen

 @VIH-4335
Scenario: Individual participant computer has both camera and microphone
	Given 'Individual' participant is on 'about your computer' page	
	When Individual provides answer as yes
	And Individual proceeds to next page
	Then Individual should be on 'your internet connection' screen

@VIH-4335
Scenario: Individual participant not sure about computer having camera and microphone
	Given 'Individual' participant is on 'about your computer' page	
	When Individual provides answer as not sure
	And Individual proceeds to next page
	Then Individual should be on 'your internet connection' screen

@VIH-4335
Scenario: Your computer Page - Individual participant attempts to proceed to next page without providing answer
	Given 'Individual' participant is on 'about your computer' page
	When Individual attempts to proceed without selecting an answer
	Then 1 error should be displayed