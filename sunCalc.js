/*
 First 310 rows.
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date and latitude/longitude

SunCalc.getTimes = function (date, lat, lng) {

    var lw = rad * -lng,
        phi = rad * lat,

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];

        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// export as Node module / AMD module / browser variable
if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = SunCalc;
else if (typeof define === 'function' && define.amd) define(SunCalc);
else window.SunCalc = SunCalc;

}());


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
    b2 = b.replace(/:/g, ".");
    
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
    b2 = b.replace(/:/g, ".");
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