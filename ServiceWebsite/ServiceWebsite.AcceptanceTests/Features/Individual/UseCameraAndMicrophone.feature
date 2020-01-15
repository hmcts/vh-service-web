Feature: Use Camera and Microphone
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

Scenario: Use Camera and Microphone
	Given the Individual has progressed to the Use Camera and Microphone page
	Then contact details are available
	When the user clicks on the why do I need to use my camera and mic link
	Then the explanation of why the need to use my camera and mic is shown
	When the user clicks the Switch on button
	Then a message appears stating 'Your camera is now switched on'
	When the user clicks the Watch video button
	Then the user is on the Participant View page
	When the user signs out 
	Then the answers have not been stored

@Blocked
Scenario: Block Use of Camera and Microphone
	Given the Individual has progressed to the Use Camera and Microphone page
	When the user clicks the Switch on button
	Then the user is on the Equipment Blocked page