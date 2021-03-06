﻿Feature: Test Your Equipment
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Smoketest-Extended @Individual
Scenario: Test Your Equipment Individual
	Given the Individual has progressed to the Test Your Equipment page
	Then contact details are available
	And the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Watch the video again button
	Then the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Continue button
	Then the user is on the Camera Working page
	When the user signs out 
	Then the answers have not been stored

@Smoketest-Extended  @Representative
Scenario: Test Your Equipment Representative
	Given the Representative has progressed to the Test Your Equipment page
	Then contact details are available
	And the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Watch the video again button
	Then the Test Your Equipment video begins to play
	When the Test Your Equipment video has ended
	And the user clicks the Continue button
	Then the user is on the Camera Working page
	When the user signs out 
	Then the answers have not been stored