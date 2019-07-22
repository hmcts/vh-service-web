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


