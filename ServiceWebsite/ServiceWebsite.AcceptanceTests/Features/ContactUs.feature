Feature: Contact Us For Help
As an Individual participant
I want to be provided with a way of viewing contact details for the video hearing officer
So that I can contact them if I need help

@smoketest
Scenario: Individual views contact details
	Given 'Individual' is provided with a way of viewing contact details
	When Individual is on any of the service web page 
	Then Individual should be able to view contact details