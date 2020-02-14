Feature: Check Your Answers
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@VIH-5510
Scenario: Check Your Answers
	Given the Representative has progressed to the Check Your Answers page
	Then contact details are available
	And the hearing details are displayed correctly
	And the answer for who'll be presenting is displayed correctly
	And the answer for other information is displayed correctly
	When the user signs out 
	Then the answers have been stored

@VIH-5510
Scenario: Check Your Answers change presenter
	Given the Representative has progressed to the Check Your Answers page
	Then contact details are available
	And the hearing details are displayed correctly
	And the answer for who'll be presenting is displayed correctly
	When the user changes who'll be presenting
	Then the answer for who'll be presenting is displayed correctly
	When the user signs out 
	Then the answers have been stored

@VIH-5510
Scenario: Check Your Answers change other information
	Given the Representative has progressed to the Check Your Answers page
	Then contact details are available
	And the hearing details are displayed correctly
	And the answer for other information is displayed correctly
	When the user changes the other information
	Then the answer for other information is displayed correctly
	When the user signs out 
	Then the answers have been stored