Feature: Switch On Camera and Microphone
	As an Invidual or Representative
	I am on Switch Camera and Microphone and blocked camera and microphone 
	So that I can see media blocked screen

@VIH-4447 @Individual
Scenario: Switch On Camera and Microphone Individual
	Given the Individual has progressed to the Switch On Camera and Microphone page
	Then contact details are available
	When the user clicks the Switch on button
	Then a message appears stating 'Your camera and microphone are now switched on'
	When the user clicks the Watch the video button
	Then the user is on the Test Your Equipment page
	When the user signs out 
	Then the answers have not been stored

@VIH-4447 @Representative
Scenario: Switch On Camera and Microphone Representative
	Given the Representative has progressed to the Switch On Camera and Microphone page
	Then contact details are available
	When the user clicks the Switch on button
	Then a message appears stating 'Your camera and microphone are now switched on'
	When the user clicks the Test equipment button
	Then the user is on the Test Your Equipment page
	When the user signs out 
	Then the answers have not been stored