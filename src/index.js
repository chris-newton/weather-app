import { page } from './page.js';
import { drawContent } from './viewController.js';

import './style.css';

await page.setData(); // inital GET request with default location
drawContent(); 

// search location button
const searchbox = document.querySelector("#searchbox");
searchbox.addEventListener("submit", async (e) => {
    e.preventDefault();
    const locationQuery = searchbox.querySelector('input[name="location"]').value;

    // update model (page object)
    page.setLocation(locationQuery);
    await page.setData(); // new GET request
    
    // update view (DOM)
    drawContent();
});

// toggle C / F button
// updates Page object
// swaps data content units
const unitToggle = document.querySelector("#unit-toggle");
unitToggle.addEventListener("change", () => {
    console.log("toggled")
    page.toggleUnitSystem(); // update model

    drawContent();     // update view
});
