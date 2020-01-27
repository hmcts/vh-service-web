Feature: Switch On Camera and Microphone
	As an Invidual or Representative
	I am on Switch Camera and Microphone and blocked camera and microphone 
	So that I can see media blocked screen

@VIH-4447 
Scenario: Switch On Camera and Microphone Individual
	Given the Individual has progressed to the Switch On Camera and Microphone page
	Then contact details are available
	When the user clicks the Switch on button
	Then a message appears stating 'Your camera and microphone are switched on'
	When the user clicks the Watch video button
	Then the user is on the Test Your Equipment page
	When the user signs out 
	Then only the about you answers have been stored

@VIH-4447 
Scenario: Switch On Camera and Microphone Representative
	Given the Representative has progressed to the Switch On Camera and Microphone page
	Then contact details are available
	When the user clicks the Switch on button
	Then a message appears stating 'Your camera and microphone are switched on'
	When the user clicks the Watch video button
	Then the user is on the Test Your Equipment page
	When the user signs out 
	Then only the your hearing answers have been stored