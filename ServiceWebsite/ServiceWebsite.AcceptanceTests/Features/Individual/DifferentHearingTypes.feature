Feature: Different Hearing Types
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Individual
Scenario: Different Hearing Types
	Given the Individual has progressed to the Different Hearing Types page
	Then contact details are available
	When the user clicks the Continue button
	Then the user is on the Explore Court Building page
	When the user signs out 
	Then the answers have not been stored
