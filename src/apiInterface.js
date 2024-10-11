/* makes the request to visualcrossing API for a location,
 * unpacks and returns json object containing weather data  
 */
async function getAtLocation(location, unitSystem) {
    const apiKey = '48N7WEYRBYYVZUYF4JKE6EJDZ';
    const requestUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitSystem}&key=${apiKey}`;

    const response = await fetch(requestUrl);
    const json = await response.json();
    return json;
}

export const getWeather = getAtLocation;