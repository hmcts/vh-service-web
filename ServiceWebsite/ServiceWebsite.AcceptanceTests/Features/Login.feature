Feature: Participants Accessing VH-Admin Web
	As an Invidual or Representative
	I would like to login to VH-Service Web
	So that I can complete suitability Questionnaire

@smoketest
Scenario: Individual logs in to Vh-Service web
	When Individual logs in with valid credentials
	Then Individual starts suitability questionnaire

@smoketest
Scenario: Representative logs in to Vh-Service web
	When Representative logs in with valid credentials
	Then Representative starts suitability questionnaire