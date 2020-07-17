# How to Use Mock Data for *Skip to the Loo*

This is a guide on how to use mock data for the application without needing to make actual calls to Google's (costly) Places API.

## Requirements

* A way to capture json data:
  * Postman, or
  * Google Chrome with JSON Formatter extension

## Capturing the Mock Data

Start up the application and create a folder in public called mockdata/
```
public/mockdata
```

IMPORTANT: For the two steps below, make sure to replace XXXXXXX and YYYYYYY with your own latitude and longitude values. These are printed to the console when your visit the home page.

Next, grab the JSON from the URL `http://localhost:8080/api/nearby/home?lat=XXXXXXXX&lon=YYYYYYYY` and save the data to `public/mockdata/mockdb.json`

Then, grab the JSON from the URL `http://localhost:8080/api/nearby/search?lat=XXXXXXXXX&lon=YYYYYYYYYYY` and save the data to `public/mockdata/mockGoogle.json`

## Enabling Debug Mode

To enable debug mode, open your `.env` file (in the root directory) and add the following line:

```
DEBUG_MODE=true
```

## Verification

To verify that you're using the mock data and not real data pulled from Google, you should see the following output in the server's console:

```
debug mode get
source home
```

or 

```
debug mode get
source search
```

You should definitely **not** see this output:

```
not mock
```

## To Dos

I have only mocked the data for the home and search default views when you initial load either page.

Work still needs to be done on the following:
* photo loading
* detailed place get call