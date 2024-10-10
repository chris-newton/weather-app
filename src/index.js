import { getWeather } from './apiInterface.js';

const response = await getWeather("london");
console.log(response);