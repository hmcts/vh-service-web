Feature: Individual views information video
	As an Individual Participant	
	I want to view more information about video hearings
	So that I can see what a video hearing is like from a Participant's point of view

@smoketest @VIH-4401 @VIH-4066
Scenario: Individual views information about video hearings
	Given Individual participant is on camera and microphone page
	When Camera and Microphone are switched on
	Then Individual participant should be able to view information video

@smoketest @VIH-4401 @VIH-4066 @BlockCameraAndMic
Scenario: Individual participant blocks Camera and microphone
	Given Individual participant is on camera and microphone page
	When Camera and Microphone are not switched on
	Then Individual participant should not be able to continue with suitability questionnaire 