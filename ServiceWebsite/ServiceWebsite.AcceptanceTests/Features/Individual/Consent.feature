﻿Feature: Consent
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Consent
	Given the Individual has progressed to the Consent page
	Then contact details are available
	When attempts to click Save and continue without selecting an answer
	Then an error message appears stating 'Select if you would be content to take part in the hearing by video'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Check Your Computer page

Scenario: Consent - User drops out with No Answer
	Given the Individual has progressed to the Consent page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
