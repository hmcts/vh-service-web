Feature: Check Your Computer
	As an Invidual or Representative
	I am on Check Your computer screen after completing intial questionnaire 
	So that I can complete self test Questionnaire

@VIH-4577
Scenario: Consent Individual
	Given the Individual has progressed to the Check Your Computer page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if this is the same computer you would use for a video hearing'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Switch On Camera and Microphone page

@VIH-4577
Scenario: Consent - Individual User drops out with No Answer
	Given the Individual has progressed to the Consent page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page

@VIH-4577
Scenario: Consent Representative
	Given the Representative has progressed to the Check Your Computer page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if this is the same computer you would use for a video hearing'
	When the user selects the 'Yes' radiobutton
	And the user clicks the Continue button
	Then the user is on the Switch On Camera and Microphone page

@VIH-4577
Scenario: Consent - Representative User drops out with No Answer
	Given the Representative has progressed to the Consent page
	When the user selects the 'No' radiobutton
	And the user clicks the Continue button
	Then the user is on the Thank You page
