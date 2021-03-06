# vh-service-web
The service frontend and first point of contact for individual and representative users. This is where they first access the service and are prompted to submit a number or questions regarding their and their hearing suitability as in terms of video hearings.

They will then, once submitted, be redirected to the vh-video-web.

## Running code coverage

1. Install the report generator dotnet tool
https://www.nuget.org/packages/dotnet-reportgenerator-globaltool/

You may need to restart your prompt to get the updated path.

2. CD into the `ServiceWebsite` folder

3. Run the command for windows or osx `./run_coverage.sh` or `run_coverage.bat`

The coverage report will open automatically after run, joining the results for both integration and unit tests.


# Sonar Cloud
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vh-service-web&metric=alert_status)](https://sonarcloud.io/dashboard?id=vh-service-web)

# Build Status
[![Build Status](https://hmctsreform.visualstudio.com/VirtualHearings/_apis/build/status/hmcts.vh-service-web?branchName=master)](https://hmctsreform.visualstudio.com/VirtualHearings/_build/latest?definitionId=39&branchName=master)

# Generating the clients
If the interface for either the MVC or the Bookings API is updated these can be rebuilt using the following commands:

In the `ServiceWebsite/ClientApp` folder:
```
npx nswag run api-ts.nswag
```

In the `ServiceWebsite.UserAPI.Client` project:
```
npx nswag run user-api-csharp.nswag 
```

In the `ServiceWebsite.BookingsAPI.Client` project:
```
npx nswag run booking-api-csharp.nswag 
```

# Running accessibility linting
In the `ClientApp` folder run `node accessibility_lint.js`. Will output a json with any issues.

#Localization
In html files, for localised text, set attribute 'i18n' for element or attribute with a unique identifier like `i18n="@@customerId"`.

For inner text:
```html
<p i18n="@@useCameraMicrophone_p_1">Switch on camera.</p>
```

For attribute:
```html
<input value="Continue" i18n-value="@@useCameraMicrophone_btn_continue" type="button" />
```

For custom inputs/attribute, you have to use the canonical binding form:
```html
<app-details [detailsTitle]="titleVariable"><app-details>
```

Would be:
```html
<app-details bind-detailsTitle="titleVariable" i18n-bind-details="@@detailsTitle><app-details> 
```

Create a translation source file in the `ServiceWebsite/ClientApp` folder:
```bash
ng xi18n --output-path translate
```

It will create folder 'translate' and source file 'messages.xlf'

##Branch name git hook will run on pre commit and control the standard for new branch name.

The branch name should start with: feature/VIH-XXXX-branchName  (X - is digit).
If git version is less than 2.9 the pre-commit file from the .githooks folder need copy to local .git/hooks folder.
To change git hooks directory to directory under source control run (works only for git version 2.9 or greater) :
$ git config core.hooksPath .githooks

##Commit message 
The commit message will be validated by prepare-commit-msg hook.
The commit message format should start with : 'feature/VIH-XXXX : ' folowing by 8 or more characters description of commit, otherwise the warning message will be presented.

## Run Stryker

To run stryker mutation test, go to UnitTest folder under command prompt and run the following command

```bash
dotnet stryker
```

From the results look for line(s) of code highlighted with Survived\No Coverage and fix them.


If in case you have not installed stryker previously, please use one of the following commands

### Global
```bash
dotnet tool install -g dotnet-stryker
```
### Local
```bash
dotnet tool install dotnet-stryker
```

To update latest version of stryker please use the following command

```bash
dotnet tool update --global dotnet-stryker
```