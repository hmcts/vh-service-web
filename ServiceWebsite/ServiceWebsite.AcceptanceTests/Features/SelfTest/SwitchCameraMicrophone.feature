Feature: Participant blocked media
	As an Invidual or Representative
	I am on Switch Camer and Microphone and blocked camera and microphone 
	So that I can see media blocked screen

@smoketest @VIH-4447 @BlockCameraAndMic
Scenario: Representative participant redirected to "Sign Back In" page when trying to answer self test questionnaire
	Given Representative participant is on 'switch on camera and microphone' page having submitted questionnaire
	When Media not switched on
	Then Representative should be on 'equipment blocked' screen

@smoketest @VIH-4068 @BlockCameraAndMic
Scenario: Individual participant redirected to "Sign Back In" page when trying to answer self test questionnaire
	Given Individual participant is on 'switch on camera and microphone' page having submitted questionnaire
	When Media not switched on
	Then Individual should be on 'equipment blocked' screen
