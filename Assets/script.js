document.getElementById('weatherData').innerHTML = 'Weather Data Displays Here'

document.getElementById('searchButton').addEventListener('click', () => {
  document.getElementById('searchInput').innerHTML = ''
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('searchInput').value}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
  .then(response => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,hourly,daily,alerts&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
    .then(response2 => {
      document.getElementById('weatherData').innerHTML = `
        <h1>${response.data.name}</h1>
        <p>Temperature: ${response.data.main.temp} ℉</p>
        <p>Humidity: ${response.data.main.humidity}%</p>
        <p>Wind Speed: ${response.data.wind.speed} MPH</p>
        <p>UV Index: ${response2.data.current.uvi}</p>
      `
      // console.log(response2.data.current)
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})