export default class TripsList {
    constructor() {
        this.trips = [];
    }

    addTrip(trip) {
        const storedTrips = JSON.parse(localStorage.getItem("tripsList"));
        if (storedTrips) {
            storedTrips.push(trip);
            const sortedTrips = storedTrips.sort((a,b) => a.fullTime-b.fullTime)
            localStorage.setItem("tripsList", JSON.stringify(sortedTrips));
        } else {
            this.trips = [];
            this.trips.push(trip);
            localStorage.setItem("tripsList", JSON.stringify(this.trips));
        }
        this.trips = JSON.parse(localStorage.getItem("tripsList"));
    }
    
    getTripsList() {
        const storedTrips = JSON.parse(localStorage.getItem("tripsList"));
        const time = Date.now();
        if(storedTrips) {
            const updatedTrips = storedTrips.map(trip => {
                if(trip.fullTime < time){
                    trip.expired = true;
                }
                return trip;
            })
            this.trips = updatedTrips;
            localStorage.setItem("tripsList", JSON.stringify(this.trips));
            return updatedTrips;
        }
    }

    getTripByID(id) {
        return this.trips.filter(trip => trip.id === id);
    }


    deleteTrip(id) {
        const storedTrips = JSON.parse(localStorage.getItem("tripsList"));
        const newTripsList = storedTrips.filter(trip => trip.id !== id);
        localStorage.setItem("tripsList", JSON.stringify(newTripsList));
        this.trips = newTripsList;
    }

    addPacking(id, packing) {
        const trip = this.trips.filter(trip => trip.id === id)[0]
        trip.packing.push(packing)
        const index = this.trips.findIndex(trip => trip.id === id)
        this.trips.splice(index, 1, trip)
        localStorage.setItem("tripsList", JSON.stringify(this.trips));
    }
    
    deletePackingItem(tripID, itemID) {
        const selectedTrip = this.trips.filter(trip => trip.id === tripID )[0]
        const updatedPacking = selectedTrip.packing.filter(item => item.id !== itemID)
        selectedTrip.packing = updatedPacking
        const index = this.trips.findIndex(trip => trip.id === selectedTrip.id)
        this.trips.splice(index, 1, selectedTrip)
        localStorage.setItem("tripsList", JSON.stringify(this.trips));
    }
    
}