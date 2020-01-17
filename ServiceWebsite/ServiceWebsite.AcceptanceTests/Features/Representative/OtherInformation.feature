﻿Feature: Other Information
	As an representative Participant
	I want to let the court know whether I have any other information to provide
	So that the court can decide whether a video hearing is not suitable for me

Scenario: Other Information
	Given the Representative has progressed to the Other Information page
	Then contact details are available
	And the hearing details are displayed correctly
	When attempts to click Save and continue without selecting an answer
	Then an error message appears stating 'Select if there’s anything you’d like the court to know'
	When the user selects the 'Yes' radiobutton
	And attempts to click Save and continue without providing additional information
	Then an error message appears stating 'Enter any information you’d like the court to know'
	When the user enters more details into the please provide more information textfield
	And the user clicks the Save and continue button
	Then the user is on the Answers Saved page
	When the user signs out 
	Then the answers have been stored