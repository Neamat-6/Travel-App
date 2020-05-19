
export default class Trip {
    constructor(id, URL, summary, weather, icon, placename, city, fullTime) {
        this.id = id;
        this.imgURL = URL;
        this.summary = summary;
        if (typeof weather === Object) {
            this.temperature = {
                high: weather.high,
                low: weather.low
            };
        } else {
            this.temperature = weather;
        }
        this.icon = icon;
        this.placename = placename;
        this.city = city;
        this.fullTime = fullTime;
        this.packing = [];
        this.expired = false
    }

}
