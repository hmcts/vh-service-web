Feature: Your Video Hearing
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Your Video Hearing
	Given the Representative has progressed to the Your Video Hearing page
	Then contact details are available on the Your Video Hearing page
	When the user clicks the Continue button
	Then the user is on the Presenting the Case page
	When the user signs out 
	Then the answers have not been stored