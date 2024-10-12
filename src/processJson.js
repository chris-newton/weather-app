function processJson(dataJson) {
    let data = {};
    
    data.address = dataJson.resolvedAddress;
    data.datetime = dataJson.currentConditions.datetime;

    data.sunrise = dataJson.currentConditions.sunrise;
    data.sunset = dataJson.currentConditions.sunset;
 
    // today data
    data.icon = dataJson.currentConditions.icon;
    data.temp = dataJson.currentConditions.temp;
    data.feelslike = dataJson.currentConditions.feelslike;
    data.humidity = dataJson.currentConditions.humidity;
    data.conditions = dataJson.currentConditions.conditions;
    data.precip = dataJson.currentConditions.precip;
    data.precipprob = dataJson.currentConditions.precipprob;
    data.preciptype = dataJson.currentConditions.preciptype;
    data.uvindex = dataJson.currentConditions.uvindex;
    data.winddir = dataJson.currentConditions.winddir;
    data.windspeed = dataJson.currentConditions.windspeed;
    data.visibility = dataJson.currentConditions.visibility;
    // next 15 days data
    data.days = dataJson.days.slice(2).map((day) => processDay(day));

    return data;
}

function processDay(day) {
    const reduced = {};
    reduced.datetime = day.datetime;
    reduced.conditions = day.conditions;
    reduced.tempmin = day.tempmin;
    reduced.tempmax = day.tempmax;
    reduced.icon = day.icon;
    return reduced;
}

export { processJson };