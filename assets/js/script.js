//inital queryselectors
var result = document.querySelector("#citySearch")
var searchEl = document.querySelector('#search')
var cityEl = document.getElementById('city')
var todayDateEl = document.getElementById('today')
var todayImgEl = document.getElementById('todayImage')
var todayTempEl = document.getElementById('todayTemp')
var todayWindEl = document.getElementById('todayWind')
var todayHumEl = document.getElementById('todayHum')
var flagEl = document.getElementById('flagLeft')

//varables used later
var j = 0
var searched = [];
var city; 

//traslates a city name into lattitude and longitude
var getCord = function (event) {
  event.preventDefault();

  //getting city name from the search
  city = result.value.trim();

  //checking the user is searching for something
  if (city === "") {
    return
  }
  
  //setting the top  of the page to be the name of the city
  cityEl.innerHTML = city

  //getting data from api
  fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=64cc75f4102d654d309a66592b2c7894', {
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lat =data[0].lat;
    var lon = data[0].lon;
    getWeather(lat, lon);
  });

  //calling the function to have a search history
  storeCity(city)
}

//same as the past function except for when the user clicks on a city in their shearch history 
var getPastCord = function (event) {
  event.preventDefault();
  city = event.target.id;
  if (city === "") {
    return
  }
  
  cityEl.innerHTML = city
  fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=64cc75f4102d654d309a66592b2c7894', {
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {  
    var lat =data[0].lat;
    var lon = data[0].lon;
    getWeather(lat, lon);
  });

}

//function for displaying the 5 day weather forceast
var getWeather = function(lat, lon) {

  //getting data from the api
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=64cc75f4102d654d309a66592b2c7894', {
    cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //displaing todays weather to the user
      todayTempEl.innerHTML = (data.list[0].main.temp -288.53).toFixed(1) + ' deg C'
      todayWindEl.innerHTML = data.list[0].wind.speed + ' mph'
      todayImgEl.src= 'http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png'
      todayHumEl.innerHTML = data.list[0].main.humidity + ' %'
      todayDateEl.innerHTML = data.list[0].dt_txt
      for (let i=1; i<7; i++) {
        //iterating over the 5 day weather forecast and displaying that to the user
        console.log(data.list[j])
        document.getElementById("Temp"+i).innerHTML = (data.list[j].main.temp -288.53).toFixed(1) + ' deg C'
        document.getElementById("Wind"+i).innerHTML = data.list[j].wind.speed + ' mph'
        document.getElementById("image"+i).src= 'http://openweathermap.org/img/wn/' + data.list[j].weather[0].icon + '.png'
        document.getElementById("Hum"+i).innerHTML = data.list[j].main.humidity + ' %'
        document.getElementById("day"+i).innerHTML = data.list[j].dt_txt
        j=j+8
        
      }
    
    });
}

//putting past seaches into localstorage
var storeCity = function (city) {
  //adding last search to the array 
  searched.push(city);
  localStorage.setItem("searched", JSON.stringify(searched));

  //calling function to display search history
  displaySearched()
}

//display search history
var displaySearched = function () {
  //clearing so there arent duplicates
  flagEl.innerHTML = ""
  
  //iterating over all past searches 
  for (var k = 0; k < searched.length; k++) {
    
    //taking info out of local storage
    var pastCity = JSON.parse(localStorage.getItem("searched"))

    //creating buttons with the text of each city
    var button = document.createElement("button");
    button.setAttribute("id", pastCity[k]);
    button.textContent=pastCity[k]
    
    //appending buttons to the flag
    flagEl.appendChild(button)

  }

}

//event listeners 
flagEl.addEventListener("click", getPastCord)
searchEl.addEventListener('submit', getCord)
