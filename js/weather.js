class City {
    constructor(name, fotoURL) { 
        this.name = name;
        this.fotoURL = fotoURL;
        this.time;
        this.temperature; // in "F"
    }
    getTime() {
        this.time = new Date().toLocaleString("en-US",
            {hour: 'numeric', minute: 'numeric'});
        return this.time;
    }

    setTemperature(temperature) {
        this.temperature = temperature;
    }

    getTemperature(scale) {
        //scale = true  -> F
        //scale = false -> C
        let temperature = (scale) ? this.temperature:
            Math.floor(5 / 9 * (this.temperature - 32));
        return temperature;
    }
}

class CitiesList {
    constructor() { 
        this.list = [];
        this.typeOfDegree = true;
        this.currentCity = 0;
        this.count = 0;
    }
    
    add (city)  {
        if (city instanceof City) {
            this.list.push(city);
            this.count++;
        }
    return this;
    }
}