import cloudy from '../assets/svg/cloudy.svg';
import rainy from '../assets/svg/rainy.svg';
import sunny from '../assets/svg/sunny.svg'
import thunderstorm from '../assets/svg/thunderstorm.svg';

import arrow_up from '../assets/svg/arrow-up-svgrepo-com.svg';

import arrow_right_up from '../assets/svg/arrow-right-up-svgrepo-com.svg';
import arrow_right from '../assets/svg/arrow-right-svgrepo-com.svg';
import arrow_right_down from '../assets/svg/arrow-right-down-svgrepo-com.svg';
import arrow_down from '../assets/svg/arrow-down-svgrepo-com.svg';
import arrow_left_down from '../assets/svg/arrow-left-down-svgrepo-com.svg';
import arrow_left from '../assets/svg/arrow-left-svgrepo-com.svg';
import arrow_left_up from '../assets/svg/arrow-left-up-svgrepo-com.svg';

// removes seconds, and leading zero if necessary 
// adds " am" or " pm" accordingly
function formatTime(time) {
    // decide if am or pm
    let period;
    if (parseInt(time.slice(0, 2)) < 12) {
        period = "am";
        // remove leading 0
        if (time[0] === "0") {
            time = time.slice(1);
        }
    } else {
        period = "pm";
        // convert 24hr time to 12hr time
        const hour = parseInt(time.slice(0, 2));
        if (hour >= 13) {
            time = (hour - 12) + time.slice(2);
        }
    }
    // remove seconds
    return time.slice(0, -3) + " " + period;
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

// returns the url for the arrow corresponding the wind direction,
// which is provided in degrees
function getWindDirectionUrl(winddir) {
    let url;
    if (winddir >= 336.5 || winddir < 22.5) { // N
        url = arrow_up;
    } else if (winddir < 67.5) {  // NE
        url = arrow_right_up; 
    } else if (winddir < 112.5) { // E
        url = arrow_right; 
    } else if (winddir < 157.5) { // SE
        url = arrow_right_down; 
    } else if (winddir < 202.5) { // S
        url = arrow_down;
    } else if (winddir < 247.5) { // SW
        url = arrow_left_down;
    } else if (winddir < 292.5) { // W
        url = arrow_left;
    } else if (winddir < 337.5) { // NW
        url = arrow_left_up; 
    }
    return url;
}

export { formatTime, getConditionsUrl, getWindDirectionUrl };