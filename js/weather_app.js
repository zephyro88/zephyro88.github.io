// check if localstorage exists
if (localStorage.getItem('coordinates') == null) {
  // display get location button
  document.getElementById("get-location").style.display = "block";
  // hide show div
  document.getElementById("show").style.display = "none";
}
else {
  // hide get location button
  document.getElementById("get-location").style.display = "none";
  // show weather
  showWeather();
}

// get location (long + lat):
var x = document.getElementById("show");
function getLocation() {
  if (navigator.geolocation) {
    // get location + save coordinates
    navigator.geolocation.getCurrentPosition(saveCooardinates);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// save coordinates to local storage
function saveCooardinates(position) {
  // set variable array
  var coordinatesObject = 
  {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  // save array to local storage
  localStorage.setItem('coordinates', JSON.stringify(coordinatesObject));

  // hide get location button
  document.getElementById("get-location").style.display = "none";

  // show "show" div
  document.getElementById("show").style.display = "block";

  // show weather
  showWeather();
}

// show weather
async function showWeather() {
  // get localstorage array + parse
  const coordinates = JSON.parse(localStorage.getItem('coordinates'));
  let latitude = coordinates.lat;
  let longitude = coordinates.lng;

  let weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude +"&longitude=" + longitude + "&timezone=auto&current_weather=true");

  let results = await weather.json();

  let current_temp = results['current_weather']['temperature'];
  let weathercode = results['current_weather']['weathercode'];

  // weathercode results:
  let weathermsg;
  if (weathercode == 0) {
    weathermsg = "Clear sky";
  } else if (weathercode == 1 || weathercode == 2 || weathercode == 3) {
    weathermsg = 	"Mainly clear, partly cloudy, and overcast";
  } else if (weathercode == 45 || weathercode == 48) {
    weathermsg = 	"Fog and depositing rime fog";
  } else if (weathercode == 51 || weathercode == 53 || weathercode == 55) {
    weathermsg = 	"Drizzle: Light, moderate, and dense intensity";
  } else if (weathercode == 56 || weathercode == 57) {
    weathermsg = 	"Freezing Drizzle: Light and dense intensity";
  } else if (weathercode == 61 || weathercode == 63 || weathercode == 65) {
    weathermsg = 	"Rain: Slight, moderate and heavy intensity";
  } else if (weathercode == 66 || weathercode == 67) {
    weathermsg = 	"Freezing Rain: Light and heavy intensity";
  } else if (weathercode == 71 || weathercode == 73 || weathercode == 75) {
    weathermsg = 	"Snow fall: Slight, moderate, and heavy intensity";
  } else if (weathercode == 77) {
    weathermsg = 	"Snow grains";
  } else if (weathercode == 80 || weathercode == 81 || weathercode == 82) {
    weathermsg = 	"Rain showers: Slight, moderate, and violent";
  } else if (weathercode == 85 || weathercode == 86) {
    weathermsg = 	"Snow showers slight and heavy";
  } else if (weathercode == 95) {
    weathermsg = 	"Thunderstorm: Slight or moderate";
  } else if (weathercode == 96 || weathercode == 99) {
    weathermsg = 	"Thunderstorm with slight and heavy hail";
  }

  // display weather
  document.getElementById("show").innerHTML = "<h3>" + current_temp + "&degC</h3> <br>" + weathermsg;
}