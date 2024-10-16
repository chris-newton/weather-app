import { page } from './page.js';
import { formatTime, getConditionsUrl, getWindDirectionUrl, getDayOfWeek, 
    formatDate, getMonthString } from './util.js';

function drawContent() {
    const dataObj = page.getDataObj(); 

    const mainContainer = document.querySelector("#main-container");
    mainContainer.replaceChildren();

    const header = drawHeader(dataObj.address, dataObj.datetime);
    const main = drawMain(dataObj.temp, dataObj.conditions, dataObj.feelslike, dataObj.icon);
    const details = drawDetails(dataObj.winddir, dataObj.windspeed, dataObj.humidity, 
        dataObj.uvindex, dataObj.visibility, dataObj.precipprob, dataObj.precip, 
        dataObj.sunrise, dataObj.sunset);
    const days = drawDays(dataObj);

    mainContainer.append(header, main, details, days);
}

function drawHeader(address, date) {
    const header = document.createElement("div");
    header.className = "content-header";

    const location = document.createElement("h1");
    location.className = "location";
    location.textContent = address;

    const time = document.createElement("h3");
    time.classList.add("date-time", "secondary-text");

    const today = new Date();
    time.textContent = formatTime(date) + "  |  " + getMonthString(today.getMonth()) +
        " " + today.getDate() + ", " + today.getFullYear();

    header.append(location, time);

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

function drawDetails(winddir, windspeed, humidity, uvindex, visibility, precipprob,
    precip, sunrise, sunset) {
    const details = document.createElement("div");
    details.className = "details-grid";

    const windContent = document.createElement("div");

    const windDirectionImg = document.createElement("img");
    windDirectionImg.className = "wind-direction-img";
    windDirectionImg.src = getWindDirectionUrl(winddir);

    const windText = document.createElement("h2");
    windText.textContent = windspeed + (page.unitSystem === "us" ? " mph" : " kmh");
    
    windContent.append(windDirectionImg, windText);
    const windBox = createDetail("Wind", windContent);

    const humidityContent = document.createElement("h2");
    humidityContent.textContent = humidity + "%";
    const humidityBox = createDetail("Humidity", humidityContent);

    const uvContent = document.createElement("h2");
    uvContent.textContent = uvindex;
    const uvBox = createDetail("UV index", uvContent);
        
    const visibilityContent = document.createElement("h2");
    visibilityContent.textContent = visibility + (page.unitSystem === "us" ? " mi" : " km");
    const visibilityBox = createDetail("Visibility", visibilityContent);
    
    const precipProbContent = document.createElement("h2");
    precipProbContent.textContent = precipprob + "%";
    const precipProbBox = createDetail("Precip. Chance", precipProbContent);
    
    const precipContent = document.createElement("h2");
    const precipitation = precip ? precip : "0";
    precipContent.textContent = precipitation + (page.unitSystem === "us" ? " in" : " mm");
    const precipBox = createDetail("Precipitation", precipContent);
    
    const sunriseContent = document.createElement("h2");
    const sunriseTime = formatTime(sunrise);
    sunriseContent.textContent = sunriseTime;
    const sunriseBox = createDetail("Sunrise", sunriseContent);

    const sunsetContent = document.createElement("h2");
    const sunsetTime = formatTime(sunset);
    sunsetContent.textContent = sunsetTime;
    const sunsetBox = createDetail("Sunset", sunsetContent);
    
    details.append(windBox, humidityBox, uvBox, visibilityBox, precipProbBox, precipBox,
        sunriseBox, sunsetBox);

    return details;
}

function createDetail(headingText, content) {
    const detail = document.createElement("div");
    
    const heading = document.createElement("h4");
    heading.className = "detail-heading";
    heading.textContent = headingText;

    content.className = "detail-content";

    detail.append(heading, content);
    return detail;
}

function drawDays(dataObj) {
    const days = document.createElement("div");
    days.className = "content-days";

    dataObj.days.forEach((day) => {
        console.log(day);
        const dayCard = document.createElement("div");
        dayCard.className = "day-card";

        const dayOfWeek = document.createElement("h2");
        dayOfWeek.textContent = getDayOfWeek(day.datetime);

        const date = document.createElement("h3");
        date.textContent = formatDate(day.datetime);
        
        const separator = document.createElement("div");
        separator.className = "separator";

        const conditions = document.createElement("h4");
        conditions.textContent = day.conditions;
     
        const tempmax = document.createElement("div");
        const tempmaxLabel = document.createElement("h4");
        tempmaxLabel.textContent = "H: ";
        tempmaxLabel.className = "tempLabel";
        const tempmaxVal = document.createElement("h4");
        tempmaxVal.className = "tempVal";
        tempmaxVal.textContent =  day.tempmax + 
        (page.unitSystem === "us" ? "°F" : "°C");
        tempmax.append(tempmaxLabel, tempmaxVal);
        
        const tempmin = document.createElement("div");
        const tempminLabel = document.createElement("h4");
        tempminLabel.textContent = "L: ";
        tempminLabel.className = "tempLabel";
        const tempminVal = document.createElement("h4");
        tempminVal.className = "tempVal";
        tempminVal.textContent =  day.tempmin + 
        (page.unitSystem === "us" ? "°F" : "°C");
        tempmin.append(tempminLabel, tempminVal);

        const conditionsIcon = document.createElement("img");
        conditionsIcon.src = getConditionsUrl(day.icon);

        const dayDetails = document.createElement("div");
        dayDetails.className = "day-details";

        dayDetails.append(conditionsIcon, tempmax, tempmin);

        dayCard.append(dayOfWeek, date, separator, conditions, dayDetails);

        days.append(dayCard);
    });

    return days;
}

export { drawContent };