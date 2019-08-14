Feature: Participant blocked media
	As an Invidual or Representative
	I am on Switch Camera and Microphone and blocked camera and microphone 
	So that I can see media blocked screen

@VIH-4447 @BlockCameraAndMic @RepresentativeSelfTest
Scenario: Representative blocks camera
	Given Representative participant is on 'switch on camera and microphone' page having submitted questionnaire
	When Media not switched on
	Then Representative should be on 'equipment blocked' screen

@VIH-4068 @BlockCameraAndMic @IndividualSelfTest
Scenario: Individual blocks camera
	Given Individual participant is on 'switch on camera and microphone' page having submitted questionnaire
	When Media not switched on
	Then Individual should be on 'equipment blocked' screen
