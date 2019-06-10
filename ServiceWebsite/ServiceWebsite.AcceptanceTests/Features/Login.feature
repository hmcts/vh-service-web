Feature: Participants Accessing VH-Admin Web
	As an Invidual or Representative
	I would like to login to VH-Service Web
	So that I can complete suitability Questionnaire

@smoketest
Scenario: Person with no upcoming hearings is redirected to Video Web
	When 'Person' with no upcoming hearings logs in with valid credentials
	Then Person should be redirected to Video Web