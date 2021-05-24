document.getElementById('searchButton').addEventListener('click', () => {
  document.getElementById('searchInput').innerHTML = ''
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('searchInput').value}&appid=94f8ea24d2c4cd33d640135d8ee0a8d9`)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => console.error(err))
})