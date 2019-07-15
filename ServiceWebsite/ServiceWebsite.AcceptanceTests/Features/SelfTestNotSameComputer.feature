Feature: Participants Logged in on different computer to complete Self Test
	As an Invidual or Representative
	I am on Check Your computer screen after completing intial questionnaire 
	So that I can complete self test Questionnaire

@smoketest
Scenario: Representive participant redirected to "Sign Back In" page when trying to answer self test questionnaire
	Given Representative participant is on 'check your computer' page
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'sign back in' screen

@smoketest
Scenario: Individual participant redirected to "Sign Back In" page when trying to answer self test questionnaire
	Given Individual participant is on 'check your computer' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'sign back in' screen