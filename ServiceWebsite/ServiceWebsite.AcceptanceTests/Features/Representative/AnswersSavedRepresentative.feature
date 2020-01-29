Feature: Answers Saved Representative
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Answers Saved Representative
	Given the Representative has progressed to the Answers Saved page
	Then contact details are available
	And the hearing details are displayed correctly
	And the hearing date is displayed correctly
	When the user clicks the Check my computer button
	Then the user is on the Check Your Computer page
	When the user signs out 
	Then the answers have been stored