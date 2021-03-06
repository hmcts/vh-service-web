rmdir /q /s Artifacts

SET exclude=\"[ServiceWebsite.BookingApi.Client]*,[ServiceWebsite.UserAPI.Client]*,[*]ServiceWebsite.Swagger.*,[ServiceWebsite]ServiceWebsite.Program,[ServiceWebsite]ServiceWebsite.Startup,[ServiceWebsite]ServiceWebsite.ConfigureServicesExtensions,[ServiceWebsite.IntegrationTests]*,[ServiceWebsite.UnitTests]*\"
dotnet test ServiceWebsite.UnitTests/ServiceWebsite.UnitTests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat="\"opencover,cobertura,json,lcov\"" /p:CoverletOutput=../Artifacts/Coverage/ /p:MergeWith='../Artifacts/Coverage/coverage.json' /p:Exclude="${exclude}"
dotnet test ServiceWebsite.IntegrationTests/ServiceWebsite.IntegrationTests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat="\"opencover,cobertura,json,lcov\"" /p:CoverletOutput=../Artifacts/Coverage/ /p:MergeWith='../Artifacts/Coverage/coverage.json' /p:Exclude="${exclude}"

~/.dotnet/tools/reportgenerator -reports:Artifacts/Coverage/coverage.opencover.xml -targetDir:Artifacts/Coverage/Report -reporttypes:HtmlInline_AzurePipelines

"Artifacts/Coverage/Report/index.htm"