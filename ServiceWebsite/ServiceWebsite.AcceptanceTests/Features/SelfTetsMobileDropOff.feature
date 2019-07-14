Feature: Participants Logged in on mobile to complete Self Test
	As an Invidual or Representative
	I have logged in on mobile to complete self test questionnaire
	So that I can complete suitability Questionnaire

@smoketest @TestMobileFF
Scenario: Representive participant redirected to "Sign In On a Computer" page when trying to answer self test questionnaire
	Given Representative participant is on 'check your computer' page
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'sign in on computer' screen
