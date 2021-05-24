document.getElementById('searchButton').addEventListener('click', () => {
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=Anaheim&appid=94f8ea24d2c4cd33d640135d8ee0a8d9')
  .then(response => {
    console.log(response.data)
  })
  .catch(err => console.error(err))
})