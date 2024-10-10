async function getAtLocation(location) {
    const apiKey = '48N7WEYRBYYVZUYF4JKE6EJDZ';
    const requestUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

    const response = await fetch(requestUrl);
    const json = await response.json();
    return json;
}

export const getWeather = getAtLocation;