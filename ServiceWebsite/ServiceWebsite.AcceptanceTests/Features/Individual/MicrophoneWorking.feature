Feature: Microphone Working
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Microphone Working
	Given the Individual has progressed to the Microphone Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if you could see the bar moving when you spoke'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Video Working page

Scenario: Microphone Working - Check Again
	Given the Individual has progressed to the Microphone Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page
