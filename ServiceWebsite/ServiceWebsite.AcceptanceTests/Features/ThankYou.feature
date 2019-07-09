Feature: Representative views Thank You page
	As a Participant
	I want to be able to reach end of the questionnaire when I have a computer or laptop with microphone and camera
	So that I can join a video hearing

@smoketest @VIH-4444
Scenario: Representative participant has camera and microphone on laptop or desktop
	Given Representative participant is on 'your computer' page
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'about your computer' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'questionnaire completed' screen
	When proceeds to next page
	Then Representative should be on 'same computer' screen

Scenario: Representative views thank you page after submitting self test questionnaire completed page for a client who is suitable for a video hearing
	Given Representative participant starts the questionnaire
	When provides answer
	 | page                      | answer  |
	 | about you                 | No      |
	 | access to a suitable room | Yes     |
	 | about your client         | No     |
	 | client attendance         | No      |
	 | hearing suitability       | No      |
	 | your computer             | Yes     |
	 | about your computer       | Yes |

	Then Representative should be on 'questionnaire completed' screen
	And all the answers should match
	And a link with text 'Print my answers' to print the answers should be visible
	When proceeds to next page
	Then Representative should be on 'same computer' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'use camera and microphone again' screen
	When proceeds to next page
	Then Representative should be on 'self test' screen
	When proceeds to next page
	Then Representative should be on 'camera working' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'microphone working' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'see and hear video' screen
	When proceeds to next page
	Then Representative should be on 'thank you' screen
