# Patient-Extract
Entry for the GOSH_FHIRworks2020 hackathon.  
Theme Choice: **2. Graphing data from FHIR records**

A web-app visualizing patient medical observation data graphically through charts and graphs, developed using React.js and Chart.js

## Prerequisites
1) [npm](https://www.npmjs.com/) installed.

## Running the web-app

First, `git clone` the [dotnet Web API](https://github.com/greenfrogs/FHIRworks_2020?fbclid=IwAR1jihdcfRBN1821Vu_8rB-YGIo-dFPGEgf_T8nEUnaLTtIQPkrpiNBWCMU) (this version includes caching and removes the need for https). Then, fill in creadentials for the .NET Core Web API in appsettings.json, and run the following command to start the dotnet Web API server.

```bash
dotnet run
```

Then, `git clone` this project in a separate directory, and navigate into the directory containing package.json. The following command can be used to start the web-app: 

```bash
npm start
```
The web-app will be available at **localhost:3000**.  
Note that the dotnet Web API server must be running for this web-app to retrieve patient information.

## Web-App Endpoints

**Home**:

- **URL**: /
- Input form allows users to search for observations for a patient when provided with a patient ID.
- Shows general statistical data of all patients through graphs. The data is pulled from the FHIR Web API endpoints. 
- These graphs are interactive. Axis and variables can be hidden / enabled by clicking on the chart labels. 

**Observations for a Single Patient**: 

- **URL**: /observations/[patientID]
- Shows basic patient information pulled from the FHIR Web API endpoints.
- Graphical visualizations of medical information of observations pulled from the FHIR Web API endpoints, for example: Blood Pressure, Cholesterol and BMI.

