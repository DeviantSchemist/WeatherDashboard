let weatherData = JSON.parse(localStorage.getItem('weatherData')) || []
let forecastData = JSON.parse(localStorage.getItem('forecastData')) || []
let listData = JSON.parse(localStorage.getItem('listData')) || []

if (weatherData.length == 0 && forecastData.length == 0) {
  document.getElementById('weatherData').innerHTML = 'Weather Data Displays Here'
}

if (weatherData.length != 0) {
  document.getElementById('weatherData').innerHTML = `
    <h1>${weatherData.weatherName}</h1>
    <img src="${weatherData.weatherImg}" alt="${weatherData.weatherAlt}"/>
    <p>Temperature: ${weatherData.weatherTemp} ℉</p>
    <p>Humidity: ${weatherData.weatherHumid}%</p>
    <p>Wind Speed: ${weatherData.weatherSpeed} MPH</p>
    <p>UV Index: ${weatherData.weatherUV}</p>
  `
}

if (forecastData.length != 0) {
  document.getElementById('forecasts').innerHTML = '<h1>5-Day Forecast</h1>'
  forecastData.forEach(forecast => {
    document.getElementById('forecasts').innerHTML += `
      <div class="col">
        <div class="card text-white bg-primary mb-3">
          <div class="card-header">${forecast.date}</div>
          <div class="card-body">
            <h5 class="card-title"><img src="${forecast.weather}" alt="${forecast.alt}"/></h5>
            <h5 class="card-title">Temp: ${forecast.temp}℉</h5>
            <h5 class="card-title">${forecast.humidity}%</h5>
          </div>
        </div>
      </div>
    `
  })
}

if (listData.length != 0) {
  listData.forEach(listItem => {
    document.getElementById('list').insertAdjacentHTML('afterbegin', `
      <a href="#" class="list-group-item list-group-item-action">${listItem.wData.weatherName}</a>
    `)
  })
}

let counter = 0

document.getElementById('searchButton').addEventListener('click', () => {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('searchInput').value}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
  .then(response => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,hourly,daily,alerts&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
    .then(response2 => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
      .then(response3 => {
        //clears list if there are already 5 cities searched
        if (counter == 5) {
          counter = 0
          document.getElementById('list').innerHTML = ''
        }

        document.getElementById('list').insertAdjacentHTML('afterbegin', `
          <a href="#" class="list-group-item list-group-item-action">${response.data.name}</a>
        `)
        counter++

        document.getElementById('searchInput').value = ''
        document.getElementById('forecasts').innerHTML = '<h1>5-Day Forecast</h1>'
        let array = response3.data.list //array of 40 forecasts, each with a 3 hour interval
        let myMaxTemp, forecasts = []
        myMaxTemp = array[0].main.temp_max
        for (let i = 1; i <= array.length; i++) {
          if (i % 8 === 0) {
            /*
            forecasts.push({
              date: array[i - 1].dt_txt.split(' ')[0],
              weather: array[i - 1].weather[0].main,
              temp: myMaxTemp,
              humidity: array[i-1].main.humidity
            }) */
            forecasts.push({
              date: array[i - 1].dt_txt.split(' ')[0],
              weather: `http://openweathermap.org/img/wn/${array[i - 1].weather[0].icon}@2x.png`,
              alt: array[i - 1].weather[0].description,
              temp: myMaxTemp,
              humidity: array[i - 1].main.humidity
            })
            myMaxTemp = 0
          }
          if (array[i-1].main.temp_max > myMaxTemp) {
            myMaxTemp = array[i-1].main.temp_max
          }
        }

        document.getElementById('weatherData').innerHTML = `
          <h1>${response.data.name}</h1>
          <img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />
          <p>Temperature: ${response.data.main.temp} ℉</p>
          <p>Humidity: ${response.data.main.humidity}%</p>
          <p>Wind Speed: ${response.data.wind.speed} MPH</p>
          <p>UV Index: ${response2.data.current.uvi}</p>
        `
        forecasts.forEach(forecast => {
          document.getElementById('forecasts').innerHTML += `
            <div class="col">
              <div class="card text-white bg-primary mb-3">
                <div class="card-header">${forecast.date}</div>
                <div class="card-body">
                  <h5 class="card-title"><img src="${forecast.weather}" alt="${forecast.alt}" /></h5>
                  <h5 class="card-title">Temp: ${forecast.temp}℉</h5>
                  <h5 class="card-title">${forecast.humidity}%</h5>
                </div>
              </div>
            </div>
          `
        })

        weatherData = {
          weatherName: response.data.name,
          weatherImg: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          weatherAlt: response.data.weather[0].description,
          weatherTemp: response.data.main.temp,
          weatherHumid: response.data.main.humidity,
          weatherSpeed: response.data.wind.speed,
          weatherUV: response2.data.current.uvi
        }

        listData.push({
          wData: weatherData,
          fData: forecasts
        })

        //places weather data into local storage
        localStorage.setItem('weatherData', JSON.stringify(weatherData))

        // places forecast data into local storage
        localStorage.setItem('forecastData', JSON.stringify(forecasts))

        // places list items into local storage
        localStorage.setItem('listData', JSON.stringify(listData))

      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

// event listener for list
document.addEventListener('click', event => {
  if (event.target.classList.contains('list-group-item')) {
    for (let i = 0; i < listData.length; i++) {
      if (listData[i].wData.weatherName === event.target.textContent) {
        document.getElementById('weatherData').innerHTML = `
          <h1>${listData[i].wData.weatherName}</h1>
          <img src="${listData[i].wData.weatherImg}" alt="${listData[i].wData.weatherAlt}" />
          <p>Temperature: ${listData[i].wData.weatherTemp} ℉</p>
          <p>Humidity: ${listData[i].wData.weatherHumid}%</p>
          <p>Wind Speed: ${listData[i].wData.weatherSpeed} MPH</p>
          <p>UV Index: ${listData[i].wData.weatherUV}</p>
        `

        document.getElementById('forecasts').innerHTML = '<h1>5-Day Forecast</h1>'
        listData[i].fData.forEach(forecast => {
          document.getElementById('forecasts').innerHTML += `
            <div class="col">
              <div class="card text-white bg-primary mb-3">
                <div class="card-header">${forecast.date}</div>
                <div class="card-body">
                  <h5 class="card-title"><img src="${forecast.weather}" alt="${forecast.alt}"/></h5>
                  <h5 class="card-title">Temp: ${forecast.temp}℉</h5>
                  <h5 class="card-title">${forecast.humidity}%</h5>
                </div>
              </div>
            </div>
          `
        })

        break
      }
    }
  }
})