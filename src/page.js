import { getWeather } from './apiInterface.js';
import { processJson } from './processJson.js';

class Page {
    constructor(location="Baltimore", unitSystem="us") {
        this.location = location;
        this.unitSystem = unitSystem;
        this.usObj = null;
        this.metricObj = null;
    }

    // make the GET request using the provided unit system
    async loadData(unitSystem) {
        const json = await getWeather(this.location, unitSystem);
        const obj = processJson(json);
    
        console.log(json);
        
        return obj;
    }

    async setData() {
        this.usObj = await this.loadData("us");
        this.metricObj = await this.loadData("metric");

    }

    getDataObj() {
        return this.unitSystem === "us" ? this.usObj : this.metricObj;
    }

    toggleUnitSystem() {
        const newSystem = this.unitSystem === "us" ? "metric" : "us";
        this.unitSystem = newSystem;
    }

    setLocation(newLocation) {
        this.location = newLocation;
    }

    setUnitSystem(unitSystem) {
        this.unitSystem = unitSystem;
    }
}

const page = new Page();
export { page };
