# WeatherDashboard
This application allows the user to search for a city by their name, and display weather and forecast data about it. A list of the user's search history is displayed for them beneath the search bar. Relevant weather data is displayed such as temperature, humidity, and a picture indicating the sky conditions.

Having a personal weather forecast lookup application is very convenient for users who want a simple, low bloatware interface to interact with for planning trips and such. Many weather apps are part of big companies who offer streamlined UI at the price of monetary subscriptions or hiden behind numerous button presses. This is completely free and offers users the data they want with only a single click.

Bootstrap is used for the formatting, and the logic was written in Javascript. It is powered by the OpenWeather API, where all of the weather data comes from.

![Deployed Application](Assets/Screenshot.png)

Deployed application: https://deviantschemist.github.io/WeatherDashboard/

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```