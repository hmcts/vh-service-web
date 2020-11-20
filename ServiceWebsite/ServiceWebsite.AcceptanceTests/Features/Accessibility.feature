Feature: Accessibility
	In order to ensure service web is accessible to all users
	As a service
	I want to check each page for potential accessibility issues
	
@Accessibility @Individual
Scenario: Checking Video Hearing page accessibility
	Given the Individual has progressed to the Checking Video Hearing page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Thank You page accessibility
	Given the Individual has progressed to the Thank You page
	Then the page should be accessible

@Accessibility @Representative
Scenario: Thank You Rep page accessibility
	Given the Representative has progressed to the Thank You Rep page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Camera Working page accessibility
	Given the Individual has progressed to the Camera Working page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Check Your Computer page accessibility
	Given the Individual has progressed to the Check Your Computer page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Microphone Working page accessibility
	Given the Individual has progressed to the Microphone Working page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Swtich on Camera and Microphone page accessibility
	Given the Individual has progressed to the Switch On Camera and Microphone page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Test Your Equipment page accessibility
	Given the Individual has progressed to the Test Your Equipment page
	Then the page should be accessible

@Accessibility @Individual
Scenario: Video Working page accessibility
	Given the Individual has progressed to the Video Working page
	Then the page should be accessible