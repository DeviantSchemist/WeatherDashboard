document.getElementById('weatherData').innerHTML = 'Weather Data Displays Here'

document.getElementById('searchButton').addEventListener('click', () => {
  document.getElementById('searchInput').innerHTML = ''
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('searchInput').value}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
  .then(response => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,hourly,daily,alerts&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
    .then(response2 => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9&units=imperial`)
      .then(response3 => {
        let array = response3.data.list //array of 40 forecasts, each with a 3 hour interval
        let myMaxTemp, maxTemps = []
        myMaxTemp = array[0].main.temp_max
        for (let i = 1; i <= array.length; i++) {
          if (i % 8 === 0) {
            maxTemps.push(myMaxTemp)
            console.log(`Index: ${i}`)
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



        
        // for debugging
        maxTemps.forEach(temp => {
          console.log(`${temp}\n`)
        })
        console.log(array)
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})