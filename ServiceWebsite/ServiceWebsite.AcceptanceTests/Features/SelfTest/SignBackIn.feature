Feature: Sign Back In On Computer
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@VIH-4577 @Smoketest-Extended @Individual
Scenario: Sign Back In On Computer Individual
	Given the Individual has progressed to the Check Your Computer page
	When the user answers no to the Check Your Computer question
	Then the user is on the Sign Back In page
	When the user signs out 
	Then the answers have not been stored
	When the user signs back in with valid credentials
	Then the user is on the About Hearings page

@VIH-4577 @Smoketest-Extended @Representative
Scenario: Sign Back In On Computer Representative
	Given the Representative has progressed to the Check Your Computer page
	When the user answers no to the Check Your Computer question
	Then the user is on the Sign Back In page
	When the user signs out 
	Then the answers have been stored
	When the user signs back in with valid credentials
	Then the user is on the Check Your Computer page
