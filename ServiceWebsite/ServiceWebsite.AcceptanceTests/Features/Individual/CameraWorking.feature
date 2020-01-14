Feature: Camera Working
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Camera Working
	Given the Individual has progressed to the Camera Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you could see yourself in the camera window'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Microphone Working page

Scenario: Camera Working - Check Again
	Given the Individual has progressed to the Camera Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page