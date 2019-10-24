Feature: Representative answers 'Apppointing Barrister' question
	As an representative Participant
	I want to let the court know whether I have any appointed barrister
	So that the court can decide whether a video hearing is not suitable for me

@Representative
Scenario: Representative participant has appointed barrister
	Given Representative participant is on 'appointing a barrister' page	
	When provides selects option as IAmBarrister
	And proceeds to next page
	Then Representative should be on 'other information' screen

@Representative
Scenario: Representative participant will have an appointed barrister
	Given Representative participant is on 'appointing a barrister' page	
	When provides selects option as BarristerWillBeAppointed
	And proceeds to next page
	Then Representative should be on 'other information' screen

@Representative
Scenario: Representative participant will not have an appointed barrister
	Given Representative participant is on 'appointing a barrister' page	
	When provides selects option as BarristerWillNotBeAppointed
	And proceeds to next page
	Then Representative should be on 'other information' screen
