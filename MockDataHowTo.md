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

### Home
Next, grab the JSON from the URL `http://localhost:8080/api/nearby/home?lat=XXXXXXXX&lon=YYYYYYYY` and save the data to `public/mockdata/mockdb.json`

### Search
Then, grab the JSON from the URL `http://localhost:8080/api/nearby/search?lat=XXXXXXXXX&lon=YYYYYYYYYYY` and save the data to `public/mockdata/mockGoogle.json`

### Photo
Grab the output from the url `http://localhost:8080/api/photo/ZZZZZZZZ` where ZZZZZZZ is the photo reference of a Place. You can look at the output in the above json's to find a photo reference to use for this step. It should be under Place -> Photos[0] -> photo_reference. Save the data to `public/mockdata/mockPhoto.json`. Make sure to wrap the output in double quotes since it is a string value.

### Details
Grab the output from the url `public/mockdata/mockDetails.json` and save the data to `public/mockdata/mockDetails.json`.

## Enabling Debug Mode

To enable debug mode, open your `.env` file (in the root directory) and add the following line:

```
DEBUG_MODE=true
```

## Disabling Debug Mode

To disable debug mode, open your `.env` file and set DEBUG_MODE to any value other than "true"

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

TBD