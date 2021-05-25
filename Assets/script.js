document.getElementById('weatherData').innerHTML = 'Weather Data Displays Here'

document.getElementById('searchButton').addEventListener('click', () => {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('searchInput').value}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
  .then(response => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,hourly,daily,alerts&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
    .then(response2 => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
      .then(response3 => {
        document.getElementById('searchInput').value = ''
        document.getElementById('forecasts').innerHTML = '<h1>5-Day Forecast</h1>'
        let array = response3.data.list //array of 40 forecasts, each with a 3 hour interval
        let myMaxTemp, forecasts = []
        myMaxTemp = array[0].main.temp_max
        for (let i = 1; i <= array.length; i++) {
          if (i % 8 === 0) {
            forecasts.push({
              date: array[i - 1].dt_txt.split(' ')[0],
              weather: array[i - 1].weather[0].main,
              temp: myMaxTemp,
              humidity: array[i-1].main.humidity
            })
            // maxTemps.push(myMaxTemp)
            myMaxTemp = 0
          }
          if (array[i-1].main.temp_max > myMaxTemp) {
            myMaxTemp = array[i-1].main.temp_max
          }
        }

        document.getElementById('weatherData').innerHTML = `
          <h1>${response.data.name}</h1>
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
                  <h5 class="card-title">${forecast.weather}</h5>
                  <h5 class="card-title">Temp: ${forecast.temp}℉</h5>
                  <h5 class="card-title">${forecast.humidity}%</h5>
                </div>
              </div>
            </div>
          `
        })
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})