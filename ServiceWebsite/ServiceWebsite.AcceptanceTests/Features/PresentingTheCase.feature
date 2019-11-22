Feature: Representative answers 'Presenting the case' question
	As an representative Participant
	I want to let the court know whether I have a person presenting the case
	So that the court can decide whether a video hearing is not suitable for me

@Representative
Scenario: Representative participant has someone presenting the case
	Given Representative participant is on 'presenting the case' page	
	When provides selects option as IWillBePresentingTheCase
	And proceeds to next page
	Then Representative should be on 'other information' screen

@Representative
Scenario: Representative participant will have someone presenting the case
	Given Representative participant is on 'presenting the case' page	
	When provides selects option as SomeoneWillBePresentingTheCase
	And proceeds to next page
	Then Representative should be on 'other information' screen



