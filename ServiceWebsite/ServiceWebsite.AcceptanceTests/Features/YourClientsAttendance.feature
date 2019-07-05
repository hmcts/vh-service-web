Feature: Representative Answers About Your Client's Attendance
	As a Participant
	I want to be able to tell the court if client's will be attending
	So that the court can make an informed decision based on my circumstances

@VIH-4441
Scenario: Representative participant attempts to proceed to next page without selecting an answer on Your Client's Attendance page
	Given Representative participant is on 'client attendance' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed

@VIH-4441
Scenario: Representative participant provides additional information for video hearing suitability on Your Client's Attendance page
	Given Representative participant is on 'client attendance' page
	When provides answer as Yes
	And proceeds to next page
	Then Representative should be on 'hearing suitability' screen