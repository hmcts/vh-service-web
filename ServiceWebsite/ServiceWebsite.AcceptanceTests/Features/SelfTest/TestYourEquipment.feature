Feature: Test Your Equipment
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Test Your Equipment Individual
	Given the Individual has progressed to the Test Your Equipment page
	Then contact details are available
	And the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Re-play the video message button
	Then the Test Your Equipment video begins to play
	When the user clicks the Continue button
	Then the user is on the Camera Working page

Scenario: Test Your Equipment Representative
	Given the Representative has progressed to the Test Your Equipment page
	Then contact details are available
	And the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Re-play the video message button
	Then the Test Your Equipment video begins to play
	When the user clicks the Continue button
	Then the user is on the Camera Working page