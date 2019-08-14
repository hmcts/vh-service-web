Feature: Representative views Please Contact Us page
	As a Participant
	I want to be able to contact the VH admins for further help when my equipment is not suitable for a video hearing
	So that the support team can answer my questions and arrange a suitable hearing

@VIH-4563 @Representative
Scenario: Representative participant does not have access to a laptop or desktop
	Given Representative participant is on 'your computer' page
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'questionnaire completed' screen
	When proceeds to next page
	Then Representative should be on 'please contact us' screen

@VIH-4563 @Representative
Scenario: Representative participants computer does not have camera or microphone
	Given Representative participant is on 'about your computer' page
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'questionnaire completed' screen
	When proceeds to next page
	Then Representative should be on 'please contact us' screen