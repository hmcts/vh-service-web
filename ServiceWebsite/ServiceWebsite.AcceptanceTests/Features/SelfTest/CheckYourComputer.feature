Feature: Participants Logged in on different computer to complete Self Test
	As an Invidual or Representative
	I am on Check Your computer screen after completing intial questionnaire 
	So that I can complete self test Questionnaire

@VIH-4577 @RepresentativeSelfTest
Scenario: Representative participant initiates self test journey
	Given Representative participant has already submitted questionnaire but not completed self-test
	When 'Representative' logs in with valid credentials
	Then Representative should be on 'check your computer' screen

@VIH-4577 @IndividualSelfTest
Scenario: Individual participant initiates self test journey
	Given Individual participant has already submitted questionnaire but not completed self-test
	When 'Individual' logs in with valid credentials
	Then Individual should be on 'check your computer' screen
	
@VIH-4577 @RepresentativeSelfTest
Scenario: Representative participant redirected to "Sign Back In" page when trying to answer self test questionnaire
	Given Representative participant is on 'check your computer' page
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'sign back in' screen

@VIH-4577 @IndividualSelfTest
Scenario: Individual participant redirected to "Sign Back In" page when trying to answer self test questionnaire
	Given Individual participant is on 'check your computer' page
	When provides answer as No
	And proceeds to next page
	Then Individual should be on 'sign back in' screen