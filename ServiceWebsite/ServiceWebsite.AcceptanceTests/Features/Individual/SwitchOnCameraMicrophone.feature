Feature: Switch On Camera and Microphone
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Switch On Camera and Microphone
	Given the Individual has progressed to the Switch On Camera and Microphone page
	Then contact details are available
	When the user selects the 'Switch on' radiobutton
	Then a message appears stating 'Your camera and microphone are switched on'
	When the user clicks the Watch video button
	Then the user is on the Test Your Equipment page
