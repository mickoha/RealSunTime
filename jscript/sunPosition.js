import sunCalc from "./sunCalc.js";
import { bringTextSunPosition } from "./languagues.js";
import arrayLang from "./languagues.js";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(bringStartWindow, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function bringStartWindow(position) {
  var date = new Date();
  setInterval(function () {
    date = new Date();
    // date.setDate(3);
    // date.setMonth(2)
    // date.setHours(1);
    // date.setMinutes(15);
  }, 1000);

  bringTextSunPosition(position);
  setInterval(function () {
    updateSun(position, date);
    setTimes(position, date);
  }, 1000);
}

function setTimes(position, date) {
  const sunPosition = sunCalc.getPosition(
    date,
    position.coords.latitude,
    position.coords.longitude
  );

  const azimuthDegree = sunPosition.azimuth * (180 / Math.PI) + 180;

  const altitudeDegree = sunPosition.altitude * (180 / Math.PI);

  document.getElementById("azimuth").innerHTML =
    azimuthDegree.toFixed(2) + "&#176";
  document.getElementById("altitude").innerHTML =
    altitudeDegree.toFixed(2) + "&#176";
  document.getElementById(
    "latitude"
  ).innerHTML = position.coords.latitude.toFixed(6);
  document.getElementById(
    "longitude"
  ).innerHTML = position.coords.longitude.toFixed(6);

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  m = checkTime(m);
  s = checkTime(s);

  let timeZone = document.getElementById("time");
  timeZone.innerHTML = h + "." + m + "." + s;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }

  return i;
}

function updateSun(position, date) {
  const sunPosition = sunCalc.getPosition(
    date,
    position.coords.latitude,
    position.coords.longitude
  );
  var azimuth = sunPosition.azimuth;
  var azimuthPlace = azimuth * 57.2957795;

  document
    .getElementById("indicator")
    .setAttribute("style", "transform: rotate(" + azimuthPlace + "deg)");

  const times = sunCalc.getTimes(
    date,
    position.coords.latitude,
    position.coords.longitude
  );

  setSunType(times, date);
  setCounter(times, date);
}

function setCounter(times, date) {
  var language =
    window.navigator.userLanguage || window.navigator.language.slice(0, 2);
  var timeHelp = new Date(null);
  var offset = timeHelp.getTimezoneOffset() * 60;
  var text;
  var difference;

  times.nadir.setHours(times.nadir.getHours() + 24);

  if (date <= times.sunrise) {
    text = arrayLang[language]["W6"];
    difference =
      Math.floor(times.sunrise.getTime() / 1000) -
      Math.floor(date.getTime() / 1000);
  } else if (date <= times.solarNoon) {
    text = arrayLang[language]["W12"];
    difference =
      Math.floor(times.solarNoon.getTime() / 1000) -
      Math.floor(date.getTime() / 1000);
  } else if (date <= times.sunset) {
    text = arrayLang[language]["W5"];
    difference =
      Math.floor(times.sunset.getTime() / 1000) -
      Math.floor(date.getTime() / 1000);
  } else if (date > times.sunset && date < times.nadir) {
    console.log("here2");
    text = arrayLang[language]["W11"];
    difference =
      Math.floor(times.nadir.getTime() / 1000) -
      Math.floor(date.getTime() / 1000);
  } else if (date < times.nadir) {
    console.log("here");
    text = arrayLang[language]["W11"];
    difference =
      Math.floor(times.nadir.getTime() / 1000) -
      Math.floor(date.getTime() / 1000);
  } else if (date > times.nadir) {
    text = arrayLang[language]["W6"];
    difference =
      Math.floor(times.sunrise.getTime() / 1000) -
      Math.floor(date.getTime() / 1000);
  }

  timeHelp.setSeconds(difference + offset);

  let h = timeHelp.getHours();
  let m = timeHelp.getMinutes();
  let s = timeHelp.getSeconds();

  m = checkTime(m);
  s = checkTime(s);

  let counterDiv = document.getElementById("counter");
  while (counterDiv.firstChild) {
    counterDiv.removeChild(counterDiv.firstChild);
  }

  var counterText = document.createElement("p");
  counterText.setAttribute("id", "counterText");
  counterText.setAttribute("class", "notranslate");
  counterText.innerHTML = text;

  var counterTime = document.createElement("p");
  counterTime.setAttribute("id", "counterTime");
  counterTime.setAttribute("class", "notranslate");
  counterTime.innerHTML = h + "." + m + "." + s;

  counterDiv.appendChild(counterText);
  counterDiv.appendChild(counterTime);
}

function setSunType(times, date) {
  var goldenHour = times.goldenHour;
  var goldenHourEnd = times.goldenHourEnd;
  var sunsetStart = times.sunsetStart;
  var sunsetEnd = times.sunset;
  var sunriseStart = times.sunrise;
  var sunriseEnd = times.sunriseEnd;
  var dusk = times.dusk;
  var dawn = times.dawn;
  var nauticalDawn = times.nauticalDawn;
  var nauticalDusk = times.nauticalDusk;
  var night = times.night;
  var nightEnd = times.nightEnd;
  var color;
  var colorLittleSun;

  if (sunriseStart < date && date <= sunriseEnd) {
    colorLittleSun = "#F5F593";
  } else if (sunriseEnd < date && date <= goldenHourEnd) {
    colorLittleSun = "#FFFF66";
  } else if (goldenHourEnd < date && date <= goldenHour) {
    colorLittleSun = "#FFFF00";
  } else if (goldenHour < date && date < sunsetStart) {
    colorLittleSun = "#FFFF66";
  } else if (sunsetStart < date && date < sunsetEnd) {
    colorLittleSun = "#F5F593";
  } else if (sunsetEnd < date && date < dusk) {
    colorLittleSun = "#000000";
  } else if (dusk < date && date < nauticalDusk) {
    colorLittleSun = "#000000";
  } else if (nauticalDusk < date && date < night) {
    colorLittleSun = "#000000";
  } else if (night < date) {
    colorLittleSun = "#000000";
  } else if (date < nightEnd) {
    colorLittleSun = "#000000";
  } else if (nightEnd < date && date < nauticalDawn) {
    colorLittleSun = "#000000";
  } else if (nauticalDawn < date && date < dawn) {
    colorLittleSun = "#000000";
  } else if (dawn < date && date < sunriseStart) {
    colorLittleSun = "#000000";
  }

  const littleSun = document.getElementById("littleSun");
  littleSun.style = `background-color: ${colorLittleSun}`;
}

function minTwoDigits(n) {
  return (n < 10 ? "0" : "") + n;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function hmsToSecondsOnly(str) {
  let p = str.split("."),
    s = 0,
    m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}
getLocation();
