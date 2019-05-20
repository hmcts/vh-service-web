Feature: Individual views information video
	As an Individual Participant	
	I want to view more information about video hearings
	So that I can see what a video hearing is like from a Participant's point of view

@smoketest @WIP_Test @BlockCameraAndMic
Scenario: Individual user blocks Camera and microphone
	Given Individual participant proceeds to camera and microphone page
	When Camera and Microphone are not switched on
	Then Individual participant should not be able to continue with suitability questionnaire 

@VIH-4401 @VIH-4066
Scenario: Individual user views information about video hearings
	Given Individual participant proceeds to camera and microphone page
	When Camera and Microphone are switched on
	Then Individual participant should be able to view information video

@VIH-4403 @VIH-4399
Scenario: Individual proceeds to about you page
	Given Individual participant proceeds to camera and microphone page
	When Camera and Microphone are switched on
	Then Individual participant should be able to view information video
	And Individual should be on 'about you' screen