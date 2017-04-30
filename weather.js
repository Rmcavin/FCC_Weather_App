function getData(url) {
  return $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
  });
}
$(document).ready(function() {
  function handleData(json) {
      $(".placeName").html(json.name);
      $(".weather").html(json.weather[0].description);
      $(".temperature").html(Math.round(9 / 5 * (json.main.temp - 273) + 32) + "°F");

      temperature = json.main.temp;
      weatherID = json.weather[0].id;
      console.log(weatherID);
      //console.log(json);
      //console.log(temperature);

      $('body').css({
        "background": 'url(' + getWeatherClass(weatherID) + ') no-repeat center center fixed'
      });
  }

  function getWeatherClass(id) {
      if (id >= 200 && id < 233) {
          //$('body').css({"background" : 'url(images/thunderstorm.jpg) no-repeat center center fixed'});
          return "images/thunderstorm.jpg";
      }
      if (id >= 300 && id < 322) {
          return "images/drizzle.jpeg";
      }
      if (id >= 500 && id < 532) {
          return "images/rain.jpeg";
      }
      if (id >= 600 && id < 623) {
          return "images/snow.jpeg";
      }
      if (id >= 700 && id < 782) {
          return "images/atmosphere.jpeg";
      }
      if (id == 800 || id == 951) {
          return "images/clear.jpg";
      }
      if (id >= 801 && id < 805) {
          return "images/clouds.jpeg";
      }
      if (id >= 900 && id < 907 || id >= 960 && id < 963) {
          return "images/extreme.jpeg";
      }
      if (id >= 952 && id <= 959) {
          return "images/wind.jpg";
      }
  }

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=a0e228e07240d538435a1183cd474d70";
        console.log(url);
        var temperature = 0;
        var weatherID = 0;
        //Function Callback//
        getData(url).done(handleData);
      });
  }

  $("#Fahrenheit").on("click", function(json) {
              $(".temperature").html(Math.round(9 / 5 * (temperature - 273) + 32) + "°F");
  });
  $("#Celsius").on("click", function(json) {
              $(".temperature").html(Math.round(temperature - 273) + "°C");
  });
});
