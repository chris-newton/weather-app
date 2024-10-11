import { page } from './page.js';

import cloudy from '../assets/svg/cloudy.svg';
import rainy from '../assets/svg/rainy.svg';
import sunny from '../assets/svg/sunny.svg'
import thunderstorm from '../assets/svg/thunderstorm.svg';

function drawContent() {
    const dataObj = page.getDataObj(); 

    const mainContainer = document.querySelector("#main-container");
    mainContainer.replaceChildren();

    const header = drawHeader(dataObj.address, dataObj.datetime);
    const main = drawMain(dataObj.temp, dataObj.conditions, dataObj.feelslike, dataObj.icon);
    const details = drawDetails(dataObj);
    const days = drawDays(dataObj);

    mainContainer.append(header, main, details, days);
}

function drawHeader(address, datetime) {
    const header = document.createElement("div");
    header.className = "content-header";

    const location = document.createElement("h1");
    location.className = "location";
    location.textContent = address;
    const dateTime = document.createElement("h3");
    dateTime.classList.add("date-time", "secondary-text");
    dateTime.textContent = datetime;

    header.append(location, dateTime);

    return header;
}

function drawMain(temp, conditions, feelslike, icon) {
    const main = document.createElement("div");
    main.className = "content-main";

    // temperature
    const tempBox = document.createElement("div");
    tempBox.className = "temp-box";
    const currentTemp = document.createElement("h1");
    currentTemp.textContent = temp;
    const degrees = document.createElement("span");
    degrees.classList.add("degrees");
    degrees.textContent += (page.unitSystem === "us" ? "°F" : "°C");

    const conditionsIcon = document.createElement("img");
    conditionsIcon.className = "conditions-icon";
    conditionsIcon.src = getConditionsUrl(icon);

    tempBox.append(conditionsIcon, currentTemp, degrees);
    
    const conds = document.createElement("h2");
    conds.className = "conditions";
    conds.textContent = conditions;

    const feelsLike = document.createElement("h3");
    feelsLike.className = "feels-like";
    feelsLike.textContent = "Feels like " + feelslike;
    feelsLike.textContent += (page.unitSystem === "us" ? "°F" : "°C");
    
    const mainDetails = document.createElement("div");
    mainDetails.className = "main-details";
    mainDetails.append(conds, feelsLike);

    main.append(tempBox, mainDetails);

    return main;
}

function drawDetails(dataObj) {
    const details = document.createElement("div");
    details.className = "content-details";

    return details;
}

function drawDays(dataObj) {
    const days = document.createElement("div");
    days.className = "content-days";

    return days;
}


// decides which svg to display for the current conditions
function getConditionsUrl(icon) {
    let url;
    switch (icon) {
        case "clear-day":
        case "clear-night":
            url = sunny;
            break;
        case "cloudy":
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            url = cloudy;
            break;
        case "rain":
            url = rainy;
            break; 
        default:
            url = "";
            console.log("couldn't resolve conditions icon");
            break;
    }
    return url;
}

function toggleUnitSwitch() {
    const unitToggle = document.querySelector("#unit-switch");
    unitToggle.classList.toggle("switch-on");
}

export { drawContent, toggleUnitSwitch };