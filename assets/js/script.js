var result = document.querySelector("#citySearch")
var searchEl = document.querySelector('#search')


var getCord = function (event) {
  event.preventDefault();
  var city = result.value.trim();
  console.log(city)
  console.log('test')
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=64cc75f4102d654d309a66592b2c7894', {
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    var lat =data[0].lat;
    var lon = data[0].lon;
    console.log(data);
    console.log(lat, lon);
    getWeather(lat, lon);
  });
}

var getWeather = function(lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=64cc75f4102d654d309a66592b2c7894', {
    cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var temp = (data.list[1].main.temp -288.53).toFixed(1) + ' deg C'
      var wind = data.list[1].wind.speed + ' mph'
      var weathericon = 'http://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '.png'
      var hum = data.list[1].main.humidity + ' %'
      var date = Date(data.list[1].dt)
      console.log(temp, wind, hum, weathericon, date,)
    });

}

  

  searchEl.addEventListener('submit', getCord)