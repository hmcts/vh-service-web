Feature: Check Your Computer
	As an Invidual or Representative
	I am on Check Your computer screen after completing intial questionnaire 
	So that I can complete self test Questionnaire

@VIH-4577 @Individual
Scenario: Check Your Computer Individual
	Given the Individual has progressed to the Check Your Computer page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if this is the computer you'll use'
	When the user answers yes to the Check Your Computer question
	Then the user is on the Switch On Camera and Microphone page
	When the user signs out 
	Then only the about you answers have been stored
	
@VIH-4577 @Representative
Scenario: Check Your Computer Representative
	Given the Representative has progressed to the Check Your Computer page
	Then contact details are available
	And the hearing details are displayed correctly
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if this is the computer you'll use'
	When the user answers yes to the Check Your Computer question
	Then the user is on the Switch On Camera and Microphone page
	When the user signs out 
	Then only the your hearing answers have been stored

@VIH-4577 @Individual
Scenario: Individual completed checklist logs in on Check Your Computer page
	Given the Individual has progressed to the Check Your Computer page
	When the user signs out 
	And the user signs back in with valid credentials
	Then the user is on the Check Your Computer page

@VIH-4577 @Representative
Scenario: Representative completed checklist logs in on Check Your Computer page
	Given the Representative has progressed to the Check Your Computer page
	When the user signs out 
	And the user signs back in with valid credentials
	Then the user is on the Check Your Computer page

