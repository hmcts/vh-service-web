Feature: Self Test page journey validations
	As an Participant
	I want to be able to taken to the self test journey after I have submitted my questionnaire
	So that the video hearing can be performed


@VIH-4577 @selftest-individual
Scenario: Individual participant completes self test journey successfully
	Given Individual participant completes the questionnaire
	When answers all the self-test questions
	Then Individual should be on 'thank you' screen

@VIH-4577 @selftest-individual
Scenario: Individual participant initiates self test journey
	Given Given as a participant I have already submitted my questionnaire but not completed self-test
	When When I log back into the service
	Then Individual should be on 'same computer' screen
