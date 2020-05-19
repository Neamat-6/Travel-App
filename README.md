# Project Description
A travel application, that includes a simple form where you enter the location you are traveling to and the date with the time you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast.

## Other Features (Extended Project)
- Remove a trip.
- Local Storage is used to save data.
- Packing list for selected trip.
- Multiple trips can be added.
- Traditional sign-in and sign-up form.
- Additional trips are automatically sorted by countdown.
- Expired trips, their style is changed so it’s clear they're expired.
- User is kept logged in unless they logout.

# Project Instructions
- `npm run dev` or `yarn dev`: to run development mode
- `npm run prod` or `yarn prod`: to build the production version of the project
- `npm run start` or `yarn start`: to run the express server
- `npm run test` or `yarn test`: to test the project functionallities

## Getting started
- execute the command: `npm install` or `yarn install` to install the required packages.

## Setting up the API

### Step 1: Signup for the APIs keys
- First, you will need to go [here](http://www.geonames.org/export/web-services.html). Signing up will get you the Geonames API key which is a user name.
- Second, you will need to go [here](https://darksky.net/dev). Signing up will get you the Dark Sky API key.
- Finally, you will need to go [here](https://pixabay.com/api/docs/). Signing up will get you the Pixabay API key.

### Step 2: Environment Variables
- [ ] Create a new ```.env``` file in the root of the project
- [ ] Fill the .env file with your API keys like this:
```
USER_NAME=*************************
DARKSKY_KEY=***********************
PIXABAY_KEY=***********************
```