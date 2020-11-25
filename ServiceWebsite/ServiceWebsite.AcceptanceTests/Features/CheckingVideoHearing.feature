Feature: Checking Video Hearing
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Individual
Scenario: Checking video hearing for individual
	Given the Individual has progressed to the Checking Video Hearing page
	Then contact details are available
	When the user clicks the Next button
	Then the user is on the Check Your Computer page
	When the user signs out 
	Then the answers have not been stored
	
@Representative
Scenario: Checking video hearing for representative
	Given the Representative has progressed to the Checking Video Hearing page
	Then contact details are available
	When the user clicks the Next button
	Then the user is on the Check Your Computer page
	When the user signs out 
	Then the answers have not been stored
	