Feature: Representative Answers Hearing Suitability 
	As a Participant
	I want to be able to tell the court if the type of case is suitable for a video hearing
	So that the court can make an informed decision based on my circumstances

@VIH-4442 @Representative
Scenario: Representative participant attempts to proceed to next page without providing answer on Hearing suitability page
	Given Representative participant is on 'hearing suitability' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as Yes
	And attempts to proceed without providing additional information
	Then 1 error should be displayed
	When provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 1 error should be displayed

@VIH-4442 @Representative
Scenario: Representative participant provides additional information for video hearing suitability on Hearing suitability page
	Given Representative participant is on 'hearing suitability' page
	When provides additional information 'ABC'
	And proceeds to next page
	Then Representative should be on 'your computer' screen

@VIH-4442 @Representative
Scenario: Representative participant believes video hearing is suitable on Hearing suitability page
	Given Representative participant is on 'hearing suitability' page
	When provides answer as No
	And proceeds to next page
	Then Representative should be on 'your computer' screen