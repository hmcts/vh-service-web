Feature: Microphone Working
	As a Participant
	I want to let the court know if my camera was working during self-test
	So that the court can decide whether a video hearing is not suitable for me

@VIH-3940 @Individual
Scenario: Microphone Working Individual
	Given the Individual has progressed to the Microphone Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you could see the bar moving when you spoke'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Video Working page
	When the user signs out 
	Then the answers have not been stored

@VIH-3940 @Individual
Scenario: Microphone Working - Individual Check Again
	Given the Individual has progressed to the Microphone Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page

@VIH-3940 @Representative
Scenario: Microphone Working Representative
	Given the Representative has progressed to the Microphone Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you could see the bar moving when you spoke'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Video Working page
	When the user signs out 
	Then the answers have not been stored

@VIH-3940 @Representative
Scenario: Microphone Working - Representative Check Again
	Given the Representative has progressed to the Microphone Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page
