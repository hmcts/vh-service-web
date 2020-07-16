Feature: Thank You Rep
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Smoketest @Smoketest-Extended
Scenario: Thank You Representative
	Given the Representative has progressed to the Thank You Rep page
	Then contact details are available
	And the hearing details are displayed correctly
	When the user signs out 
	Then the answers have been stored
