Feature:  Individual views Thank You page
	As a Participant
	I want to be able to reach end of the questionnaire 
	And also answer all the self test questions
	So that I can join a video hearing

@Ignore('pexip issue')
@VIH-4338 @IndividualSelfTest
Scenario: Individual participant consents to video hearing
	Given Individual participant is on 'consent' page
	When provides answer as Yes
	When proceeds to next page
	Then Individual should be on 'check your computer' screen
	When provides answer as Yes
	And proceeds to next page
	Then Individual should be on 'switch on camera and microphone' screen
	When Media switched on
	And proceeds to next page
	Then Individual should be on 'test your equipment' screen
	When proceeds to next page
	And provides answer
	 | page                      | answer	|
	 | camera working            | Yes		|
	 | microphone working		 | Yes		|
	 | video working			 | Yes		|
	Then Individual should be on 'thank you' screen

