Feature: Representative views Thank You page
	As a Participant
	I want to be able to reach end of the questionnaire when I have a computer or laptop with microphone and camera
	So that I can join a video hearing

@smoketest @VIH-4444
Scenario: Representative participant has camera and microphone on laptop or desktop
	Given Representative participant is on 'your computer' page
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'about your computer' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'questionnaire completed' screen
	When proceeds to next page
	Then Representative should be on 'thank you' screen
