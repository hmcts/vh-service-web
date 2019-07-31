Feature: Representative views Thank You page
	As a Participant
	I want to be able to reach end of the questionnaire when I have a computer or laptop with microphone and camera
	And also answer all the self test questions
	So that I can join a video hearing

@ignore('pexip issue')
Scenario: Representative participant views thank you page after submitting self test answers
	Given Representative participant is on 'your computer' page
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'about your computer' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'questionnaire completed' screen
	When proceeds to next page
	Then Representative should be on 'check your computer' screen
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'switch on camera and microphone' screen
	When Media switched on
	And proceeds to next page
	Then Representative should be on 'test your equipment' screen
	When proceeds to next page
	And provides answer
	 | page                      | answer	|
	 | camera working            | Yes		|
	 | microphone working		 | Yes		|
	 | video working		     | Yes		|
	Then Representative should be on 'thank you' screen
