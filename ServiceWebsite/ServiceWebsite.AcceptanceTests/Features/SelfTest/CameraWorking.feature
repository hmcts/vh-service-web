Feature: Camera Working
	As a Participant
	I want to let the court know if my camera was working during self-test
	So that the court can decide whether a video hearing is not suitable for me

Scenario: Camera Working Individual
	Given the Individual has progressed to the Camera Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you could see yourself in the camera window'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Microphone Working page

Scenario: Camera Working - Individual Check Again
	Given the Individual has progressed to the Camera Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page

Scenario: Camera Working Representative
	Given the Representative has progressed to the Camera Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you could see yourself in the camera window'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Microphone Working page

Scenario: Camera Working - Representative Check Again
	Given the Representative has progressed to the Camera Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page