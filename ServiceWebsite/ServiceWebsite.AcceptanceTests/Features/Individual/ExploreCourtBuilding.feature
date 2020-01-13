Feature: Explore Court Building
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Explore Court Building
	Given the Individual has progressed to the Explore Court Building page
	Then contact details are available
	When the user clicks the Play the video button
	Then the user is on the Court Building Video page
	Then the exploring the court building video begins to play
	When the user clicks the Continue button
	Then the user is on the Explore Video Hearing page