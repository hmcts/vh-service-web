#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:14.15-alpine AS client 
ARG skip_client_build=false 
WORKDIR /app 
COPY ServiceWebsite/ClientApp . 
RUN [[ ${skip_client_build} = true ]] && echo "Skipping npm install" || npm install
RUN [[ ${skip_client_build} = true ]] && mkdir dist || npm run-script build-prod

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY . .
RUN dotnet restore "ServiceWebsite/ServiceWebsite.csproj"
COPY . .
WORKDIR "/src/ServiceWebsite"
RUN dotnet build "ServiceWebsite.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ServiceWebsite.csproj" -c Release -o /app/publish -p:PublishRunWebpack=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=client /app/dist /app/ClientApp/dist
ENTRYPOINT ["dotnet", "ServiceWebsite.dll"]
