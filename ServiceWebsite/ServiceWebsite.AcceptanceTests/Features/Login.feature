Feature: Participants Accessing VH-Admin Web
	As an Invidual or Representative
	I would like to login to VH-Service Web
	So that I can complete suitability Questionnaire

Scenario: Person with no upcoming hearings is redirected to Video Web
	When 'Person' with no upcoming hearings logs in with valid credentials
	Then Person should be redirected to Video Web

@VIH-4577
Scenario: Individual without computer submits questionnaire is redirected to Video Web
	Given Individual participant has already submitted questionnaire but drops out
	When 'Individual' with no upcoming hearings logs in with valid credentials
	Then Participant should be redirected to Video Web

@VIH-4577
Scenario: Representative without computer submits questionnaire is redirected to Video Web
	Given Representative participant has already submitted questionnaire but drops out
	When 'Representative' with no upcoming hearings logs in with valid credentials
	Then Participant should be redirected to Video Web