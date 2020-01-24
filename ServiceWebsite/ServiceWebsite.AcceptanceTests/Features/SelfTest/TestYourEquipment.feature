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
	When the user signs out 
	Then only the about you answers have been stored

Scenario: Test Your Equipment Representative
	Given the Representative has progressed to the Test Your Equipment page
	Then contact details are available
	And the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Re-play the video message button
	Then the Test Your Equipment video begins to play
	When the user clicks the Continue button
	Then the user is on the Camera Working page
	When the user signs out 
	Then only the your hearing answers have been stored

Scenario: Individual Self Test Score 
	Given the Individual has progressed to the Test Your Equipment page
	Then the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Continue button
	And the Individual progresses from the Camera Working page to the Thank You page
	Then the self test score is set in the results

Scenario: Representative Self Test Score 
	Given the Representative has progressed to the Test Your Equipment page
	Then the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Continue button
	And the Representative progresses from the Camera Working page to the Thank You Rep page
	Then the self test score is set in the results