$(document).ready(function() {
	//For use in changeBackground()
	var globalWeatherObj;
	
	//For conversion between celcius and fahrenheit
	function changeUnit() {
		//Gets current temperature
		var temp = document.getElementById("weatherTemp").innerHTML;
		//Converts to Fahrenheit
		if(document.getElementById("tempUnit").innerHTML == "°C") {
			temp = (temp * 1.8) + 32;
			document.getElementById("tempUnit").innerHTML = "°F"
		}
		//Converts to Celcius
		else {
			temp = (temp - 32) / 1.8;
			document.getElementById("tempUnit").innerHTML = "°C"
		}
		//Changes temperature value in document
		document.getElementById("weatherTemp").innerHTML = Math.round(temp);;
	};
	
	//Makes the browser ask the user to allow geolocation
	navigator.geolocation.getCurrentPosition(function(position) {
		//sets current coordinates to variables
		var latit = position.coords.latitude;
		var longit = position.coords.longitude;
		//calls OpenWeatherMap API to get weather information
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latit + "&lon=" + longit + "&units=metric&APPID=6a76e2e2a775c6b0f657efa62b7b41a7", function(response) {
			var weatherObj = response;
			globalWeatherObj = weatherObj;
			//Sets City, Weather, Weather Description, Weather Icon from the received JSON. Also changes the temperature unit to Celcius
			document.getElementById("city").innerHTML = weatherObj.name + " ";
			document.getElementById("weatherMain").innerHTML = weatherObj.weather[0].main + " with " + weatherObj.weather[0].description;
			document.getElementById("weatherIcon").src = "http://openweathermap.org/img/w/" + weatherObj.weather[0].icon + ".png";
			document.getElementById("weatherTemp").innerHTML = weatherObj.main.temp;
			document.getElementById("tempUnit").innerHTML = "°C";
			//Changes background depending on current weather
			changeBackground();
		});
	});
	
	function changeBackground() {
		//Accesses the Flickr API and searches for images with tags "weather", "nature" and current weather
		$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1cd2113519e3376e3254efe42eafea13&text=" + globalWeatherObj.weather[0].main + "+weather+nature&content_type=1&format=json&nojsoncallback=1", function(data) {
			//Randomly chooses one of the images that have been found
			var randomNo = Math.floor(Math.random() * data.photos.photo.length);
			//Sets some variables to generate static image link. More info here: https://www.flickr.com/services/api/misc.urls.html
			var photoID = data.photos.photo[randomNo].id;
			var farmID = data.photos.photo[randomNo].farm;
			var serverID = data.photos.photo[randomNo].server;
			var secretID = data.photos.photo[randomNo].secret;
			//Generates static URL
			var imageURL = "https://farm" + farmID + ".staticflickr.com/" + serverID + "/" + photoID + "_" + secretID + ".jpg";
			//Changes page background to the url, doesn't allow it to repeat and makes it fill 100% of the page. May leade to some blurred/pixellated images. 
			document.getElementById("weatherBody").style.background = "url('" + imageURL + "')";
			document.getElementById("weatherBody").style.backgroundRepeat = "no-repeat";
			document.getElementById("weatherBody").style.backgroundSize = "cover";
		});
	};
	
	
	//Functions to call changeUnit() on clicking the temperature or unit
	$("#weatherTemp").on("click", function() {
		changeUnit();
	});
	$("#tempUnit").on("click", function() {
		changeUnit();
	});
	

});
