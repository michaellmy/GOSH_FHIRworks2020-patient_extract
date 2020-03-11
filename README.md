## Patient-Extract
Entry for the GOSH_FHIRworks2020 hackathon. 

A React web-app visualizing patient medical data and information graphically through charts and graphs.

## Running the web-app

First, fill in creadentials for the .NET Core Web API from [here](https://github.com/greenfrogs/FHIRworks_2020?fbclid=IwAR1jihdcfRBN1821Vu_8rB-YGIo-dFPGEgf_T8nEUnaLTtIQPkrpiNBWCMU) (this version includes caching and removes the need for https) , then run `dotnet run` to start the REST API server.

This web-app can now be deployed by running `npm start`. The web-app will be available at **localhost:3000**

## Web-App Endpoints

**Home**:

- **URL**: /
- Input form allows users to search for observations for a patient when provided with a patient ID.
- Shows general statistical data of all patients through graphs pulled from the FHIR Web API endpoints. 
- These graphs are interactive. Axis and variables can be hidden / enabled by clicking on the chart labels. 

**Observations for a Single Patient**: 

- **URL**: /observations/[patientID]
- Shows basic patient information pulled from the FHIR Web API endpoints.
- Shows medical information graphically pulled from the FHIR Web API endpoints, for example: Blood Pressure, Cholesterol and BMI.

