﻿Feature: Video Working
	As a Participant
	I want to be able to tell the court if there is any reason I don't think I am suitable
	So that the court can make an informed decision based on my circumstances

@Individual
Scenario: Video Working Individual
	Given the Individual has progressed to the Video Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if the image and sound were clear'
	When the user answers yes to the video working question
	Then the user is on the Thank You page
	When the user signs out 
	Then the answers have been stored

@Individual
Scenario: Video Working - Individual Check Again
	Given the Individual has progressed to the Video Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page

@Representative
Scenario: Video Working Representative
	Given the Representative has progressed to the Video Working page
	Then contact details are available
	When attempts to click Continue without selecting an answer
	Then an error message appears stating 'Select if the image and sound were clear'
	When the user answers yes to the video working question
	Then the user is on the Thank You page
	When the user signs out 
	Then the answers have been stored

@Representative
Scenario: Video Working - Representative Check Again
	Given the Representative has progressed to the Video Working page
	When the user clicks the Check my equipment again button
	Then the user is on the Test Your Equipment page
