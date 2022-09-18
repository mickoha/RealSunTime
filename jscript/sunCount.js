import sunCalc from './sunCalc.js'
import {bringText, setSunsetSunrise} from './languagues.js'

function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(bringStartWindow)
   } else {
     alert("You need to allow your coordinates for website");
   }
}

var sunTimes = [];

function bringStartWindow(position) {
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   sunTimes.push(SunCalc.getTimes(new Date(), latitude, longitude))
   bringText(position);
   setTimeout(getTimes, 500);
}

function getTimes() {
   let time = new Date();
   let h = time.getHours();
   let m = time.getMinutes();
   let s = time.getSeconds();

   m = checkTime(m);
   s = checkTime(s);
 
   let timeZone = document.getElementById("localTime");
   timeZone.innerHTML = h + "." + m + "." + s;
 
   let apu = sunTimes[0];
 
   let midDayBySun2 = apu.solarNoon.toString().substring(16, 24);
   midDayBySun2 = midDayBySun2.replace(/:/g, ".");
   let sunNoonSecods2 = hmsToSecondsOnly(midDayBySun2);
   
   let b = time.toLocaleTimeString();
   let b2 = b.replace(/:/g, ".");
   
   let secondsTimeZone = hmsToSecondsOnly(b2);

   // if clock shows value with PM, add 12hours.
   if (b.includes("PM") && !b.substring(0, 2).includes("12")) {
       secondsTimeZone = secondsTimeZone + 43200
   }
   
   let sunTimeSeconds2 = sunNoonSecods2 - 43200;  
   let sunTimeApu = secondsTimeZone - sunTimeSeconds2;
 
   let sunTimeDate = new Date(null);
   let offset = sunTimeDate.getTimezoneOffset();
   offset = offset * 60;
   sunTimeDate.setSeconds(sunTimeApu + offset);
 
   let h2 = sunTimeDate.getHours();
   let m2 = sunTimeDate.getMinutes();
   let s2 = sunTimeDate.getSeconds();
 
   m2 = checkTime(m2);
   s2 = checkTime(s2);
 
   let sunTime = document.getElementById("sunTime");
   sunTime.innerHTML = h2 + "." + m2 + "." + s2;  

   setTimeLeft();
   
   var t = setInterval(moveTime, 1000);
   setDayNightLength();
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
   let b = time.toLocaleTimeString();
   let b2 = b.replace(/:/g, ".");
   let secondsTimeZone = hmsToSecondsOnly(b2);

   // if clock shows value with PM, add 12hours.
   if (b.includes("PM") && !b.substring(0, 2).includes("12")) {
       secondsTimeZone = secondsTimeZone + 43200
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
   
   let h3 = timeLeftHelp.getHours();
   let m3 = timeLeftHelp.getMinutes();
   let s3 = timeLeftHelp.getSeconds();
   
   m3 = checkTime(m3);
   s3 = checkTime(s3);
   
   let timeLeft = document.getElementById("timeLeft");
   timeLeft.innerHTML = h3 + "." + m3 + "." + s3;
   let timeLeftText = document.getElementById("timeLeftText");
   if (sunsetTrue) {
     setSunsetSunrise("sunset");
   } else {
     setSunsetSunrise("sunrise");
   }
 
}
function moveTime() {
   let timeZone = document.getElementById("localTime");
   let timeZoneSeconds = hmsToSecondsOnly(timeZone.innerHTML);
   timeZoneSeconds++;  
 
   let timeZoneDate = new Date(null);
   let offset = timeZoneDate.getTimezoneOffset();
   offset = offset * 60;
   timeZoneDate.setSeconds(timeZoneSeconds + offset);
 
   let h = timeZoneDate.getHours();
   let m = timeZoneDate.getMinutes();
   let s = timeZoneDate.getSeconds();
 
   m = checkTime(m);
   s = checkTime(s);
 
   timeZone.innerHTML = h + "." + m + "." + s;
 
   let sunTime = document.getElementById("sunTime");
   let sunTimeSeconds = hmsToSecondsOnly(sunTime.innerHTML);
   sunTimeSeconds++;
 
   let sunTimeDate = new Date(null);
   let offset2 = sunTimeDate.getTimezoneOffset();
   offset2 = offset2 * 60;
   sunTimeDate.setSeconds(sunTimeSeconds + offset);
 
   let h2 = sunTimeDate.getHours();
   let m2 = sunTimeDate.getMinutes();
   let s2 = sunTimeDate.getSeconds();
 
   m2 = checkTime(m2);
   s2 = checkTime(s2);
 
   sunTime.innerHTML = h2 + "." + m2 + "." + s2; 
 
   let timeLeft = document.getElementById("timeLeft");
   let timeLeftSeconds = hmsToSecondsOnly(timeLeft.innerHTML);
   timeLeftSeconds--;

   let timeLeftDate = new Date(null);
   let offset3 = timeLeftDate.getTimezoneOffset();
   offset3 = offset3 * 60;
   timeLeftDate.setSeconds(timeLeftSeconds + offset);
 
   let h3 = timeLeftDate.getHours();
   let m3 = timeLeftDate.getMinutes();
   let s3 = timeLeftDate.getSeconds();
     
   m3 = checkTime(m3);
   s3 = checkTime(s3);
     
   timeLeft.innerHTML = h3 + "." + m3 + "." + s3;
   if (timeLeftSeconds == 0) {
       setTimeout(setTimeLeft, 1000)  
       setTimeout(changeSunsetSunrise, 1000);
   }
}

function changeSunsetSunrise() {
   let timeLeftText = document.getElementById("timeLeftText");
   timeLeftText1 = timeLeftText.textContent;
   let divTimeForSun = document.getElementById("timeForSun");

   if (timeLeftText1.includes("Sunrise")) {
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
   
   let h4 = dayLengthDate.getHours();
   let m4 = dayLengthDate.getMinutes();
   let s4 = dayLengthDate.getSeconds();
 
   h4 = checkTime(h4);
   m4 = checkTime(m4);
   s4 = checkTime(s4);
 
   let dayLengthHelp = document.getElementById("dayLength2");
   dayLengthHelp.innerHTML = h4 + "." + m4 + "." + s4;  
 
   let nightLength = 86400 - dayLength;
 
   let nightLengthDate = new Date(null);
   let offset2 = nightLengthDate.getTimezoneOffset();
   offset2 = offset2 * 60;
   nightLengthDate.setSeconds(nightLength + offset);
 
   let h5 = nightLengthDate.getHours();
   let m5 = nightLengthDate.getMinutes();
   let s5 = nightLengthDate.getSeconds();
 
   h5 = checkTime(h5);
   m5 = checkTime(m5);
   s5 = checkTime(s5);
 
   let nightLengthHelp = document.getElementById("nightLength2");
   nightLengthHelp.innerHTML = h5 + "." + m5 + "." + s5;  
}

function hmsToSecondsOnly(str) {
   let p = str.split("."), s = 0, m = 1;
 
   while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }
 
    return s;
 }
 

function checkTime(i) {
   if (i < 10) {
     i = "0" + i;
   }
 
   return i;
}


window.onerror = getLocation();
