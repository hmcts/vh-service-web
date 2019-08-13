Feature: Participant Answers About You Question
	As an Participant
	I want to be able to tell the court if there is any reason I don't think  am suitable
	So that the court can make an informed decision based on my circumstances

# suggested refactoring
# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#1
Scenario: Content to be displayed as per the attached UX designs
    Given Individual participant is on 'about you' page
    When this page loads
    Then I can see the Yes and No radio buttons on the screen

# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#2
Scenario Outline: User can answer Yes or No on the About you page
    Given Individual participant is on 'about you' page
    When I click <selected_button> on this page
    Then I can see the 'Yes' button selected
    And the 'No' button not selected
Examples:
|selected_button| not_selected_button|
|Yes            | No                 |
|No             | Yes                |

# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#3
Scenario: If the user selects Yes, a text box will be displayed for the user to enter some more information
    Given Individual participant is on 'about you' page
    When provides answer as Yes # TODO: this step needs rewording/refactoring for fluency and parametirization 
    Then I should see a text box asking me to enter more information
    
# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#4.1 
# If the user clicks Continue without selecting either Yes or No, an error message should be displayed
Scenario: Individual participant attempts to proceed to next page without providing answer on About You page
	Given Individual participant is on 'about you' page
	When attempts to proceed without selecting an answer # TODO: this step needs rewording/refactoring for fluency and parametirization
	Then 1 error should be displayed
	#When provides answer as Yes
	#And attempts to proceed without providing additional information
	#Then 1 error should be displayed
	#When provides additional information containing a two character length 'AB' -> #covered as part of @AcceptanceCriteria#5
	#And proceeds to next page
	#Then 1 error should be displayed

# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#4.2 
# If the user clicks Continue without selecting either Yes or No, an error message should be displayed
Scenario: Individual participant attempts to proceed without providing additional information after selecting Yes on About You page
    Given Individual participant is on 'about you' page
    And I provided my answer as Yes # TODO: this step needs rewording/refactoring for fluency and parametirization 
    When attempts to proceed without providing additional information # TODO: this step needs rewording/refactoring for fluency 
    Then 1 error should be displayed
   
# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#5
Scenario Outline: If the user selects Yes and clicks Continue with the text box containing less than 3 characters, an error message should be displayed
    Given Individual participant is on 'about you' page
    And I provided my answer as Yes # TODO: this step needs rewording/refactoring for fluency and parametirization 
    And I see a text box asking me to enter more information
    When I type a text of <text_length> characters
    And proceeds to next page
    Then I should <error_should_be_displayed> an error message on the screen
Examples:
|text_length|error_should_be_displayed|
|2          | see                     |
|3          | not see                 |
|4          | not see                 |

# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#6
Scenario: URL for this screen is /about-you
Given Individual participant is on 'about you' page
When this page loads
Then this page URL matches with '/about-you' as expected

# https://tools.hmcts.net/jira/browse/VIH-4332
# original scenario refactoring
@VIH-4332 @Individual @AcceptanceCriteria#7
Scenario: The Contact us section to be displayed as per the attached UX
Given Individual participant is on 'about you' page
When this page loads
Then I can see the 'Contact Us' section displayed as per UX #TODO: get the expected XPath location on the page, assert manually and roll out for regression testing
# end of suggested refactoring

# original scenario
@VIH-4332 @Individual
Scenario: Individual participant attempts to proceed to next page without providing answer on About You page
    Given Individual participant is on 'about you' page
    When attempts to proceed without selecting an answer
    Then 1 error should be displayed
    When provides answer as Yes
    And attempts to proceed without providing additional information
    Then 1 error should be displayed
    When provides additional information containing a two character length 'AB'
    And proceeds to next page
    Then 1 error should be displayed

@VIH-4332 @Individual
Scenario: Individual participant provides additional information for video hearing suitability
	Given Individual participant is on 'about you' page
	When provides additional information 'ABC'
	And proceeds to next page
	Then Individual should be on 'interpreter' screen

@VIH-4430 @Representative
Scenario: Representative participant attempts to proceed to next page without providing answer on About You page
	Given Representative participant is on 'about you' page
	When attempts to proceed without selecting an answer
	Then 1 error should be displayed
	When provides answer as Yes
	And attempts to proceed without providing additional information
	Then 1 error should be displayed
	When provides additional information containing a two character length 'AB'
	And proceeds to next page
	Then 1 error should be displayed

 @VIH-4332 @Representative
Scenario: Representative participant provides additional information for video hearing suitability
	Given Representative participant is on 'about you' page
	When provides additional information 'ABC'
	And proceeds to next page
	Then Representative should be on 'access to a suitable room' screen
	