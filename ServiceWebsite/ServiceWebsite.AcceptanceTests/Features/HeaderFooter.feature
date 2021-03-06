﻿Feature: Header Footer
	In order to access common external pages across all pages
	As a registered user
	I want to be able to see and access external pages from the header and footer

@VIH-4090 @Individual
Scenario: Individual beta banner
	Given the Individual has progressed to the Checking Video Hearing page
	Then the beta banner should be displayed

@VIH-4090 @Representative
Scenario: Representative beta banner
	Given the Representative has progressed to the Checking Video Hearing page
	Then the beta banner should be displayed

@VIH-4701 @Individual
Scenario: Individual privacy policy page
	Given the Individual has progressed to the Checking Video Hearing page
	When the user clicks the Privacy policy link
	And switches to the privacy tab
	Then the user is on the Privacy Policy page 

@VIH-4701 @Representative
Scenario: Representative privacy policy page
	Given the Representative has progressed to the Checking Video Hearing page
	When the user clicks the Privacy policy link
	And switches to the privacy tab
	Then the user is on the Privacy Policy page 

@VIH-5023 @Individual
Scenario: Individual accessibility statement
	Given the Individual has progressed to the Checking Video Hearing page
	When the user clicks the Accessibility link
	Then the user is on the Accessibility page 

@VIH-5023 @Representative
Scenario: Representative accessibility statement
	Given the Representative has progressed to the Checking Video Hearing page
	When the user clicks the Accessibility link
	Then the user is on the Accessibility page 

@VIH-4090 @Individual
Scenario: Individual open government licence
	Given the Individual has progressed to the Checking Video Hearing page
	When the user clicks the Open Government Licence link
	Then the user is on the Open Government Licence page 
	
@VIH-4090 @Representative
Scenario: Representative open government licence
	Given the Representative has progressed to the Checking Video Hearing page
	When the user clicks the Open Government Licence link
	Then the user is on the Open Government Licence page 