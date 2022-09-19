import sunCalc from "./sunCalc.js";
import { bringTextMoonPosition } from "./languagues.js";
import arrayLang from "./languagues.js";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(bringStartWindow, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

var languageTranslate =
  window.navigator.userLanguage || window.navigator.language.slice(0, 2);
var language =
  (window.navigator.languages && window.navigator.languages[0]) || "en";

function bringStartWindow(position) {
  var date = new Date();
  setInterval(function () {
    date = new Date();
  }, 1000);
  var radius = 50;
  var offset = 2;
  const moon = [radius, offset];

  bringTextMoonPosition(position);
  setMoonPhaseDays(date);
  setInterval(function () {
    updateMoon(position, date, moon);
    setTimes(position, date);
  }, 1000);
}

function updateMoon(position, date, moon) {
  const moonPosition = sunCalc.getMoonIllumination(date);

  const arcRadius = moon[0] - moon[1];
  const arcDiameter = arcRadius * 2;

  var waxingArc = arcRadius;
  var waxingSweep = 1;
  var waningArc = arcRadius;
  var waningSweep = 1;

  var sweep = 0;
  var arcFraction = 1 - moonPosition.fraction * 2;
  if (arcFraction < 0) {
    arcFraction = arcFraction * -1;
    sweep = 1;
  }

  if (moonPosition.phase <= 0.5) {
    waxingArc = arcFraction * arcRadius;
    waxingSweep = sweep;
  } else {
    waningArc = arcFraction * arcRadius;
    waningSweep = sweep;
  }

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${moon[0] * 2} ${moon[0] * 2}`);
  // var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  // circle.setAttribute("r", moon[0])
  // circle.setAttribute("cx", moon[0])
  // circle.setAttribute("cy", moon[0])
  // svg.appendChild(circle)

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    `
      M ${moon[0]} ${moon[0]} 
      m 0 ${arcRadius * -1} 
      a ${waningArc} ${arcRadius} 0 0 ${waningSweep} 0 ${arcDiameter}
      a ${waxingArc} ${arcRadius} 0 0 ${waxingSweep} 0 ${arcDiameter * -1}
      z`
  );
  path.setAttribute("fill", "white");
  svg.appendChild(path);

  svg.setAttribute("class", "moonSmall");
  svg.setAttribute("id", "littleMoon");

  const moonDiv = document.getElementById("indicator");
  while (moonDiv.firstChild) {
    moonDiv.removeChild(moonDiv.firstChild);
  }

  moonDiv.appendChild(svg);

  //  const parallacticAngle = sunCalc.getMoonPosition(date, position.coords.latitude, position.coords.longitude)
  //  const sum = moonPosition.angle - parallacticAngle.parallacticAngle
  //  const angle = sum * 57.2957795;
  //  document.getElementById('moon').setAttribute('style', 'transform: rotate(' + angle + 'deg)');

  rotateMoon(position, date);
}

function rotateMoon(position, date) {
  const moonPosition = sunCalc.getMoonPosition(
    date,
    position.coords.latitude,
    position.coords.longitude
  );
  var azimuth = moonPosition.azimuth;
  var azimuthPlace = azimuth * 57.2957795;

  document
    .getElementById("indicator")
    .setAttribute("style", "transform: rotate(" + azimuthPlace + "deg)");

  var littleMoonRotation;

  if (azimuthPlace >= 0) {
    littleMoonRotation = -Math.abs(azimuthPlace);
  } else {
    littleMoonRotation = Math.abs(azimuthPlace);
  }

  document
    .getElementById("littleMoon")
    .setAttribute("style", "transform: rotate(" + littleMoonRotation + "deg)");

  const times = sunCalc.getMoonTimes(
    date,
    position.coords.latitude,
    position.coords.longitude
  );

  setMoonType(times, date);
  setCounter(times, date);
}

function setMoonType(times, date) {
  var color;

  if (times.rise <= date && times.set > date) {
    color = "#FFFFF";
  } else {
    color = "#000000";
  }

  // document.getElementById("littleMoon").style = `background-color: ${color}`;
}

function numberToLocaleString(x, count) {
  return x.toLocaleString(languageTranslate, {
    maximumFractionDigits: count,
  });
}

function setMoonPhaseDays(date) {
  var dateThis = date;

  dateThis.setSeconds(0);

  var dateNewMoon = [
    {
      dateHelp: dateThis,
      phaseDifference: Number.MAX_VALUE,
      phase: 0,
    },
  ];

  var dateFullMoon = [
    {
      dateHelp: dateThis,
      phaseDifference: Number.MAX_VALUE,
      phase: 0,
    },
  ];

  var dateFirstHalfMoon = [
    {
      dateHelp: dateThis,
      phaseDifference: Number.MAX_VALUE,
      phase: 0,
    },
  ];

  var dateSecondHalfMoon = [
    {
      dateHelp: dateThis,
      phaseDifference: Number.MAX_VALUE,
      phase: 0,
    },
  ];

  for (var i = 0; i < 30; i++) {
    for (var a = 0; a < 24; a++) {
      for (var c = 0; c < 60; c++) {
        const moonIllumination = sunCalc.getMoonIllumination(dateThis);
        const phase = moonIllumination.phase;
        if (
          phase >= 0 &&
          phase < 0.25 &&
          phase - 0 < dateNewMoon[0].phaseDifference
        ) {
          dateNewMoon[0] = {
            dateHelp: new Date(dateThis),
            phase: phase,
            phaseDifference: phase - 0,
          };
        }

        if (
          phase >= 0.5 &&
          phase < 0.75 &&
          phase - 0.5 < dateFullMoon[0].phaseDifference
        ) {
          dateFullMoon[0] = {
            dateHelp: new Date(dateThis),
            phase: phase,
            phaseDifference: phase - 0.5,
          };
        }
        if (
          phase >= 0.25 &&
          phase < 0.5 &&
          phase - 0.25 < dateFirstHalfMoon[0].phaseDifference
        ) {
          dateFirstHalfMoon[0] = {
            dateHelp: new Date(dateThis),
            phase: phase,
            phaseDifference: phase - 0.25,
          };
        }
        if (
          phase >= 0.75 &&
          phase < 0.9999 &&
          phase - 0.75 < dateSecondHalfMoon[0].phaseDifference
        ) {
          dateSecondHalfMoon[0] = {
            dateHelp: new Date(dateThis),
            phase: phase,
            phaseDifference: phase - 0.75,
          };
        }

        dateThis.setMinutes(dateThis.getMinutes() + 1);
      }
    }
  }

  var firstMoon = false;

  if (dateFirstHalfMoon[0].dateHelp < dateSecondHalfMoon[0].dateHelp) {
    firstMoon = true;
  }

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  var newMoonDiv = document.createElement("div");
  newMoonDiv.setAttribute("id", "newMoonId");
  newMoonDiv.setAttribute("class", "notranslate");

  var newMoonText = document.createElement("p");
  newMoonText.setAttribute("id", "newMoonText");
  newMoonText.setAttribute("class", "notranslate");
  console.log(arrayLang);
  console.log(language);
  newMoonText.innerHTML = arrayLang[languageTranslate]["W16"];

  var newMoonMonth = document.createElement("p");
  newMoonMonth.setAttribute("id", "newMoonMonth");
  newMoonMonth.setAttribute("class", "notranslate");
  newMoonMonth.innerHTML = dateNewMoon[0].dateHelp.toLocaleString(language, {
    month: "long",
  });

  var newMoonDate = document.createElement("p");
  newMoonDate.setAttribute("id", "newMoonDate");
  newMoonDate.setAttribute("class", "notranslate");
  newMoonDate.innerHTML = dateNewMoon[0].dateHelp
    .getDate()
    .toLocaleString(language);

  var newMoonTime = document.createElement("p");
  newMoonTime.setAttribute("id", "newMoonTime");
  newMoonTime.setAttribute("class", "notranslate");
  newMoonTime.innerHTML = dateNewMoon[0].dateHelp.toLocaleString(
    language,
    options
  );

  newMoonDiv.appendChild(newMoonText);
  newMoonDiv.appendChild(newMoonMonth);
  newMoonDiv.appendChild(newMoonDate);
  newMoonDiv.appendChild(newMoonTime);

  var halfMoonDiv = document.createElement("div");
  halfMoonDiv.setAttribute("id", "halfMoonId");
  halfMoonDiv.setAttribute("class", "notranslate");

  var halfMoonText = document.createElement("p");
  halfMoonText.setAttribute("id", "halfMoonText");
  halfMoonText.setAttribute("class", "notranslate");
  halfMoonText.innerHTML = arrayLang[languageTranslate]["W17"];

  var halfMoonMonth = document.createElement("p");
  halfMoonMonth.setAttribute("id", "halfMoonMonth");
  halfMoonMonth.setAttribute("class", "notranslate");
  if (firstMoon) {
    halfMoonMonth.innerHTML = dateFirstHalfMoon[0].dateHelp.toLocaleString(
      language,
      { month: "long" }
    );
  } else {
    halfMoonMonth.innerHTML = dateSecondHalfMoon[0].dateHelp.toLocaleString(
      language,
      { month: "long" }
    );
  }

  var halfMoonDate = document.createElement("p");
  halfMoonDate.setAttribute("id", "halfMoonDate");
  halfMoonDate.setAttribute("class", "notranslate");
  if (firstMoon) {
    halfMoonDate.innerHTML = dateFirstHalfMoon[0].dateHelp
      .getDate()
      .toLocaleString(language);
  } else {
    halfMoonDate.innerHTML = dateSecondHalfMoon[0].dateHelp
      .getDate()
      .toLocaleString(language);
  }

  var halfMoonTime = document.createElement("p");
  halfMoonTime.setAttribute("id", "halfMoonTime");
  halfMoonTime.setAttribute("class", "notranslate");
  if (firstMoon) {
    halfMoonTime.innerHTML = dateFirstHalfMoon[0].dateHelp.toLocaleString(
      language,
      options
    );
  } else {
    halfMoonTime.innerHTML = dateSecondHalfMoon[0].dateHelp.toLocaleString(
      language,
      options
    );
  }

  halfMoonDiv.appendChild(halfMoonText);
  halfMoonDiv.appendChild(halfMoonMonth);
  halfMoonDiv.appendChild(halfMoonDate);
  halfMoonDiv.appendChild(halfMoonTime);

  var fullMoonDiv = document.createElement("div");
  fullMoonDiv.setAttribute("id", "fullMoonId");
  fullMoonDiv.setAttribute("class", "notranslate");

  var fullMoonText = document.createElement("p");
  fullMoonText.setAttribute("id", "fullMoonText");
  fullMoonText.setAttribute("class", "notranslate");
  fullMoonText.innerHTML = arrayLang[languageTranslate]["W18"];

  var fullMoonMonth = document.createElement("p");
  fullMoonMonth.setAttribute("id", "fullMoonMonth");
  fullMoonMonth.setAttribute("class", "notranslate");
  fullMoonMonth.innerHTML = dateFullMoon[0].dateHelp.toLocaleString(language, {
    month: "long",
  });

  var fullMoonDate = document.createElement("p");
  fullMoonDate.setAttribute("id", "fullMoonDate");
  fullMoonDate.setAttribute("class", "notranslate");
  fullMoonDate.innerHTML = dateFullMoon[0].dateHelp
    .getDate()
    .toLocaleString(language);

  var fullMoonTime = document.createElement("p");
  fullMoonTime.setAttribute("id", "fullMoonTime");
  fullMoonTime.setAttribute("class", "notranslate");
  fullMoonTime.innerHTML = dateFullMoon[0].dateHelp.toLocaleTimeString(
    language,
    options
  );

  fullMoonDiv.appendChild(fullMoonText);
  fullMoonDiv.appendChild(fullMoonMonth);
  fullMoonDiv.appendChild(fullMoonDate);
  fullMoonDiv.appendChild(fullMoonTime);

  const phases = document.getElementById("phases");
  phases.appendChild(newMoonDiv);
  phases.appendChild(halfMoonDiv);
  phases.appendChild(fullMoonDiv);
}

function setTimes(position, date) {
  const moonPosition = sunCalc.getMoonPosition(
    date,
    position.coords.latitude,
    position.coords.longitude
  );

  const azimuthDegree = moonPosition.azimuth * (180 / Math.PI) + 180;

  const altitudeDegree = moonPosition.altitude * (180 / Math.PI);

  document.getElementById("azimuth").innerHTML =
    numberToLocaleString(azimuthDegree, 2) + "&#176";
  document.getElementById("altitude").innerHTML =
    numberToLocaleString(altitudeDegree, 2) + "&#176";
  document.getElementById("latitude").innerHTML = numberToLocaleString(
    position.coords.latitude,
    6
  );
  document.getElementById("longitude").innerHTML = numberToLocaleString(
    position.coords.longitude,
    6
  );
  document.getElementById("moonDistance").innerHTML =
    numberToLocaleString(moonPosition.distance, 2) + " KM";

  let timeZone = document.getElementById("time");
  const localeTimeZone = date.toLocaleTimeString(language);
  timeZone.innerHTML = localeTimeZone;
}

function setCounter(times, date) {
  var timeHelp = new Date(null);
  var offset = timeHelp.getTimezoneOffset() * 60;
  var text;
  var difference;

  if (times.rise && times.set) {
    if (date <= times.set && times.set < times.rise) {
      text = arrayLang[languageTranslate]["W15"];
      difference =
        Math.floor(times.set.getTime() / 1000) -
        Math.floor(date.getTime() / 1000);
    } else if (date >= times.rise && date < times.set) {
      text = arrayLang[languageTranslate]["W15"];
      difference =
        Math.floor(times.set.getTime() / 1000) -
        Math.floor(date.getTime() / 1000);
    } else if (date >= times.set && date >= times.rise) {
      text = arrayLang[langualanguageTranslatege]["W15"];
      difference =
        Math.floor(times.set.getTime() / 1000) -
        Math.floor(date.getTime() / 1000);
    } else if (date <= times.rise) {
      text = arrayLang[languageTranslate]["W14"];
      difference =
        Math.floor(times.rise.getTime() / 1000) -
        Math.floor(date.getTime() / 1000);
    } else if (date <= times.set) {
      text = arrayLang[languageTranslate]["W15"];
      difference =
        Math.floor(times.set.getTime() / 1000) -
        Math.floor(date.getTime() / 1000);
    }

    timeHelp.setSeconds(difference + offset);

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

    const x = timeHelp.toLocaleTimeString(language, { hour12: false });
    const text2 = (x.substring(0, 2) === "24" && x.replace(/24/, "0")) || x;
    counterTime.innerHTML = text2;

    counterDiv.appendChild(counterText);
    counterDiv.appendChild(counterTime);
  }
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

getLocation();
