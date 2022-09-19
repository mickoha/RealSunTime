import sunCalc from "./sunCalc.js";
import { bringText, setSunsetSunrise } from "./languagues.js";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(bringStartWindow);
  } else {
    alert("You need to allow your coordinates for website");
  }
}

var language =
  (window.navigator.languages && window.navigator.languages[0]) || "en";

var sunTimes = [];

function bringStartWindow(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  sunTimes.push(SunCalc.getTimes(new Date(), latitude, longitude));
  bringText(position);
  setInterval(getTimes, 1000);
  setDayNightLength();
}

function getTimes() {
  setLocaleTime();
  setSunTime();
  setTimeLeft();
}

function setLocaleTime() {
  let time = new Date();

  const localeTime = time.toLocaleTimeString(language);

  let timeZone = document.getElementById("localTime");
  timeZone.innerHTML = localeTime;
}

function setSunTime() {
  let time = new Date();
  let apu = sunTimes[0];

  let midDayBySun2 = apu.solarNoon.toString().substring(16, 24);
  midDayBySun2 = midDayBySun2.replace(/:/g, ".");
  let sunNoonSecods2 = hmsToSecondsOnly(midDayBySun2);

  let b = time.toLocaleTimeString("en");
  let b2 = b.replace(/:/g, ".");

  let secondsTimeZone = hmsToSecondsOnly(b2);

  // if clock shows value with PM, add 12hours.
  if (b.includes("PM") && !b.substring(0, 2).includes("12")) {
    secondsTimeZone = secondsTimeZone + 43200;
  }

  let sunTimeSeconds2 = sunNoonSecods2 - 43200;
  let sunTimeApu = secondsTimeZone - sunTimeSeconds2;

  let sunTimeDate = new Date(null);
  let offset = sunTimeDate.getTimezoneOffset();
  offset = offset * 60;
  sunTimeDate.setSeconds(sunTimeApu + offset);

  const localeSunTime = sunTimeDate.toLocaleTimeString(language);
  sunTime.innerHTML = localeSunTime;
}

function setTimeLeft() {
  let apu = sunTimes[0];

  let sunrise = apu.sunrise.toString().substring(16, 24);
  sunrise = sunrise.replace(/:/g, ".");
  let sunset = apu.sunset.toString().substring(16, 24);
  sunset = sunset.replace(/:/g, ".");

  let sunriseSeconds = hmsToSecondsOnly(sunrise);

  let sunsetSeconds = hmsToSecondsOnly(sunset);

  var lenghtToSunrise = 0;
  var sunsetTrue = true;

  let time = new Date();
  let b = time.toLocaleTimeString("en");
  let b2 = b.replace(/:/g, ".");
  let secondsTimeZone = hmsToSecondsOnly(b2);

  // if clock shows value with PM, add 12hours.
  if (b.includes("PM") && !b.substring(0, 2).includes("12")) {
    secondsTimeZone = secondsTimeZone + 43200;
  }

  if (secondsTimeZone > sunsetSeconds) {
    lenghtToSunrise = 86400 - secondsTimeZone;
    lenghtToSunrise += sunriseSeconds;
    sunsetTrue = false;
  } else if (secondsTimeZone < sunriseSeconds) {
    lenghtToSunrise = sunriseSeconds - secondsTimeZone;
    sunsetTrue = false;
  } else {
    lenghtToSunrise = sunsetSeconds - secondsTimeZone;
  }

  let timeLeftHelp = new Date(null);
  let offset = timeLeftHelp.getTimezoneOffset();
  offset = offset * 60;
  timeLeftHelp.setSeconds(lenghtToSunrise + offset);

  let timeLeft = document.getElementById("timeLeft");
  const x = timeLeftHelp.toLocaleTimeString(language, { hour12: false });
  const text = (x.substring(0, 2) === "24" && x.replace(/24/, "0")) || x;
  timeLeft.innerHTML = text;

  if (sunsetTrue) {
    setSunsetSunrise("sunset");
  } else {
    setSunsetSunrise("sunrise");
  }
}

function setDayNightLength() {
  let apu = sunTimes[0];
  let sunrise = apu.sunrise.toString().substring(16, 24);
  let sunset = apu.sunset.toString().substring(16, 24);
  sunrise = sunrise.replace(/:/g, ".");
  sunset = sunset.replace(/:/g, ".");
  let sunriseSeconds = hmsToSecondsOnly(sunrise);
  let sunsetSeconds = hmsToSecondsOnly(sunset);

  let dayLength = sunsetSeconds - sunriseSeconds;

  let dayLengthDate = new Date(null);
  let offset = dayLengthDate.getTimezoneOffset();
  offset = offset * 60;
  dayLengthDate.setSeconds(dayLength + offset);

  let dayLengthHelp = document.getElementById("dayLength2");
  const localeDayLenghtHelp = dayLengthDate.toLocaleTimeString(language, {
    hour12: false,
  });
  dayLengthHelp.innerHTML = localeDayLenghtHelp;

  let nightLength = 86400 - dayLength;

  let nightLengthDate = new Date(null);
  let offset2 = nightLengthDate.getTimezoneOffset();
  offset2 = offset2 * 60;
  nightLengthDate.setSeconds(nightLength + offset);

  let nightLengthHelp = document.getElementById("nightLength2");
  const localeNightLenghtHelp = nightLengthDate.toLocaleTimeString(language, {
    hour12: false,
  });
  nightLengthHelp.innerHTML = localeNightLenghtHelp;
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

window.onerror = getLocation();
