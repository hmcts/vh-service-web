Feature: Individual Information Screens
As an Individual Participant
I want to see some information about video hearings before I start the questionnaire
So that I have a better understanding of what a video hearing is

@smoketest
Scenario: Individual views blue information screens
	Given Individual logs in with valid credentials
	When Individual starts suitability questionnaire	
	Then Individual should view blue information screens