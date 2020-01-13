Feature: Participant View
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Participant View
	Given the Individual has progressed to the Participant View page
	Then contact details are available
	And the participant view video begins to play
	When the user clicks the Re-play the video button
	Then the video restarts
	When the user clicks the Continue button
	Then the user is on the Help the Court Decide page
