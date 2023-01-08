
// fetch('https://api.openweathermap.org/data/2.5/forecast?=london&appid=64cc75f4102d654d309a66592b2c7894', {
//   cache: 'reload',
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

  // api.openweathermap.org/data/2.5/weather?q=London&appid={64cc75f4102d654d309a66592b2c7894}
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=Cincinnati&limit=5&appid=64cc75f4102d654d309a66592b2c7894', {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    var lat =data[1].lat;
    var lon = data[1].lon;
    console.log(lat, lon)
  });