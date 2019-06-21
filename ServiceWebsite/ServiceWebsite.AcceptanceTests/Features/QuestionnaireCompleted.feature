Feature: Representative lands on Questionnaire Completed page
	As a Representative
	I want to see a summary of the answers I submitted
	So that I can print a copy for my records

@smoketest @VIH-4443
Scenario: Representative views question completed page
	Given Representative participant starts the questionnaire
	When provides answer
	 | page					| answer	   | details			| 
	 | about you			| Yes		   | I am partially deaf   |
	 | access to a suitable room | Yes		   ||
	 | about your client	| Yes		   | mobility issues     |
	 | client attendance	| Yes		   ||
	 | hearing suitability  | Yes		   |insufficient documents|
	 | your computer		| Yes		   ||
	 | about your computer  | Yes		   ||

	Then Representative should be on 'questionnaire completed' screen
	And all the answers should match
	When proceeds to next page
	Then Representative should be on 'thank you' screen

