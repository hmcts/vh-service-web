Feature: Checking Video Hearing Rep
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Representative
Scenario: Checking Video Hearing Rep
	Given the Representative has progressed to the Checking Video Hearing page
	Then contact details are available
	When the user clicks the Next button
	Then the user is on the Check your computer page
	When the user signs out 
	Then the answers have not been stored