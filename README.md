# React Native app with Hygraph headless CMS

## About

- The application is an intermediary between cleaning businesses and customers


## Prerequisites

```
- expo-cli
- node 18+
- Hygraph account
```
## Create Hygraph models like the below ones 
- https://onedrive.live.com/?id=FC1EFF316086F2B3%21308&resid=FC1EFF316086F2B3%21308&ithint=folder&authkey=%21AMVpLU9PQ450Mb8&cid=fc1eff316086f2b3
## Changes needed

- Add a `Constants.js` file under `App/Utils` and replace the keys below
```
const CLERK_API_KEY = '<your clerk api key>';
const HYGRAPH_MASTER_URL = '<your hygraph master url>';

module.exports = {
    CLERK_API_KEY,
    HYGRAPH_MASTER_URL
};
```

## How to setup?

### Clone this repository

```
git clone https://github.com/manjunathmkotabal/React-Native-App.git
```
```
cd React-Native-App
```

### Install Prerequisites

```
npm install
```

### Run the App by using below command and follow instructins.

```
npm run start
```

## Open Expo Go app on your mobile or Camera app on IOS to check

