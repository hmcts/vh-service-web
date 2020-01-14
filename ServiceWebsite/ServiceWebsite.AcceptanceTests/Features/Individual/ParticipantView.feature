Feature: Participant View
	As an Individual Participant	
	I want to view more information about video hearings
	So that I can see what a video hearing is like from a Participant's point of view

@VIH-4401 
Scenario: Participant View
	Given the Individual has progressed to the Participant View page
	Then contact details are available
	And the participant view video begins to play
	When the user clicks the Re-play the video button
	Then the video restarts
	When the user clicks the Continue button
	Then the user is on the Help the Court Decide page
