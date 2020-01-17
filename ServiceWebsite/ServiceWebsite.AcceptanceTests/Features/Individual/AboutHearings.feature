﻿Feature: About Hearings
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: About Hearings
	Given the Individual has progressed to the About Hearings page
	Then contact details are available
	When the user clicks the Next button
	Then the user is on the Different Hearing Types page
	When the user signs out 
	Then the answers have not been stored
	