Feature: Explore Video Hearing
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Explore Video Hearing
	Given the Individual has progressed to the Explore Video Hearing page
	Then contact details are available
	When the user clicks the Continue button
	Then the user is on the Use Camera and Microphone page
