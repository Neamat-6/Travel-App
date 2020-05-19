//Import styles
import "./styles/standard.scss";
import "./styles/colors.scss";
import "./styles/basic.scss";
import "./styles/splashScreen.scss";
import "./styles/formSection.scss";
import "./styles/welcomeScreen.scss";
import "./styles/saveTrip.scss";
import "./styles/trip.scss";
import "./styles/tripsList.scss";
import "./styles/pageAnimation.scss";
import "./styles/packingList.scss";

//Import js files
import domItems from "./js/domItems";
import smallDevicesSetUp from "./js/smallDevicesSetUp";
import wideDevicesSetUp from "./js/wideDevicesSetUp";
import {
    onSavingATrip,
    onLoginEvent,
    onLogoutEvent,
    onMobileMenuEvent,
    closeMobileMenu,
    loginScreen,
    registrationScreen,
    
} from "./js/screensCtrl";
import Trip from "./js/Trip";
import TripsList from "./js/TripsList";
import {
    updateTripUI,
    updateTripsList,
    viewTrip,
    clearTripScreen,
    packingItemsScreen,
    clearTripsListScreen
} from "./js/createDom";
import {
    logout,
    getCurrentDate,
    getCurrentTime,
    postData,
    getData,
    registrationNewUser
} from "./js/utils";
import { v4 as uuidv4 } from "uuid";

//Import fontawesome icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faLuggageCart } from "@fortawesome/free-solid-svg-icons/faLuggageCart";
import { faHotel } from "@fortawesome/free-solid-svg-icons/faHotel";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faSquare } from "@fortawesome/free-regular-svg-icons/faSquare";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
/**SET UP FONTAWESOME ICONS */
library.add(faLuggageCart);
library.add(faHotel);
library.add(faPlus);
library.add(faMapMarkerAlt);
library.add(faList);
library.add(faSquare);
library.add(faArrowLeft);
library.add(faExclamationTriangle);
dom.watch();
/**import dom elements */
const {
    loginBtn,
    logoutBtn,
    nameInput,
    passwordInput,
    saveTripBtn,
    tripDateInput,
    tripTimeInput,
    tripCityInput,
    tripCountryInput,
    tripScreen,
    tripsListScreen,
    yourTripsListBtn,
    mobileMenu,
    humbergerMenu,
    addItemBtn,
    addItemForm,
    addItemToPackingBtn,
    itemInput,
    itemQntInput,
    packingSection,
    yourPackingBtn,
    backArrow,
    tripTabbar,
    registerUser,
    newNameInput,
    newPasswordInput,
    confirmPasswordInput
} = domItems;

const tripsList = new TripsList();
const user = JSON.parse(localStorage.getItem("user"));
/**gottenID is to store temporarily a trip id to use it when saving packing */
let gottenID;

/**SET UP CURRENT TIME AND DATE AS DEFULT VALUES */
const currentDate = getCurrentDate();
const currentTime = getCurrentTime();
tripDateInput.value = currentDate;
tripTimeInput.value = currentTime;
/**********************/

document.addEventListener("click", e => e.preventDefault());
/**CHECK THE DOCUMENT ON LOADING OR ON RESIZING FOR WIDTH CHANGE TO APPLY EITHER MOBILE SETTINGS OR DESKTOP SETTINGS */
onload = () => {
    if (innerWidth >= 768) {
        wideDevicesSetUp();
        if (tripsList.getTripsList()) {
            /**if there is any saved trips, update the UI */
            updateTripsList(tripsList.getTripsList());
        }
    } else {
        smallDevicesSetUp();
        if (tripsList.getTripsList()) {
            updateTripsList(tripsList.getTripsList());
        }
    }

};

onresize = () => {
    if (innerWidth >= 768) {
        wideDevicesSetUp();
        if (tripsList.getTripsList()) {
            updateTripsList(tripsList.getTripsList());
        }
    } else {
        smallDevicesSetUp();
        if (tripsList.getTripsList()) {
            updateTripsList(tripsList.getTripsList());
        }
    }

};

/**DISPLAY CORRESPONDENT SCREENS AS USER IS LOGGED IN */
if (user) {
    if (user.logged) {
        onLoginEvent();
    }
}

/**LOGIN EVENT */
loginBtn.addEventListener("click", () => {
    const userName = nameInput.value;
    const userPassword = passwordInput.value;
    loginScreen(userName, userPassword);
    if (tripsList.getTripsList()) {
        updateTripsList(tripsList.getTripsList());
    }
});
/***Regestration new user */
registerUser.addEventListener("click", () => {
    const name = newNameInput.value;
    const password = newPasswordInput.value;
    const confirmedPassword = confirmPasswordInput.value;
    if(registrationNewUser(password, confirmedPassword, name)){

        registrationScreen();
        clearTripsListScreen();
        if(innerWidth <= 768){
            tripScreen.style.display = "grid";
        }
    }
});
/**EVENTS WHEN USER SAVES A TRIP */
saveTripBtn.addEventListener("click", async () => {
    const city = tripCityInput.value;
    const country = tripCountryInput.value;
    const departingTime = tripTimeInput.value;
    const departingDate = tripDateInput.value;
    const location = city + " " + country;

    /**FULLTIME IS DEPARTING TIME IN MILLISECONDS */
    const fullTime = new Date(departingDate + " " + departingTime).getTime();
    /**DATEONLY IS THE DATE OF THE START TIME OF THE DEPARTING DAY, FOR TRIPS WHICH ARE WITHIN THE CURRENT WEEK TO GET WEATHER OF THAT SPECIFIC DAY**/
    const dateOnly = new Date(departingDate + " 00:00:00");
    /**SEVENDAYSFROMNOW IS TO CALCULATE ONE WEEK FROM THE CURRENT DATE */
    const sevenDaysFromNow = Date.now() + 6.048e8;

    if (city && country && departingDate && departingTime) {
        /**CHECK IF THE USER ENTERED THE CORRECT DATE */
        if (fullTime < Date.now()) {
            alert("You have put a past date, try again!");
        } else {
            /**CHECK IF THE USER HAS ENTERED A DATE WITHIN THE WEEK OR NOT */
            if (fullTime > sevenDaysFromNow) {
                try {
                    const server = await fetch('http://localhost:8000')
                    if(server.status === 200){
                    try {
                            postData("http://127.0.0.1:8000/", {
                                placename: location,
                                fullTime,
                                dateOnly: false
                            });
                            getData("http://127.0.0.1:8000/*").then(res => {
                                const newTrip = new Trip(
                                    uuidv4(),
                                    res.imgURL,
                                    res.summary,
                                    res.temperature,
                                    res.icon,
                                    location,
                                    city,
                                    fullTime
                                );
                                updateTripUI(newTrip.id, city, res, fullTime);
                                tripsList.addTrip(newTrip);
                                updateTripsList(tripsList.getTripsList());
                                onSavingATrip(currentTime, currentDate);
                            });
                        } catch (error) {
                            alert(`we couldn't reach the server with `, error)
                        }
                        }
                        
                    } catch (error) {
                        alert('server is offline!')
                }
            } else {
                try {
                    const server = await fetch('http://localhost:8000')
                    if(server.status === 200){
                    try {
                            postData("http://127.0.0.1:8000/", {
                                placename: location,
                                fullTime: false,
                                dateOnly
                            });
                        getData("http://127.0.0.1:8000/*").then(res => {
                            const newTrip = new Trip(
                                uuidv4(),
                                res.imgURL,
                                res.summary,
                                res.temperature,
                                res.icon,
                                location,
                                city,
                                fullTime
                            );
                            updateTripUI(newTrip.id, city, res, fullTime);
                            tripsList.addTrip(newTrip);
                            updateTripsList(tripsList.getTripsList());
                            onSavingATrip(currentTime, currentDate);
                    });
                        } catch (error) {
                            alert(`we couldn't reach the server with `, error)
                        }
                        }
                        
                    } catch (error) {
                        alert('server is offline!')   
                }
            }
        }
    } else {
        alert("All fields are required!");
    }
});

/**DISPLAY OR DELETE SELECTED TRIP FROM THE LIST */
document.querySelector(".inner-container").addEventListener("click", e => {
    if (e.target.className === "trips-list__view-btn") {
        viewTrip(e.target.parentElement.parentElement.id, tripsList.getTripsList());
        if (innerWidth <= 768) {
            tripsListScreen.classList.add("move-right");
        }
    }
    if (e.target.className === "trips-list__delete-btn") {
        tripsList.deleteTrip(e.target.parentElement.parentElement.id);
        updateTripsList(tripsList.getTripsList());
        clearTripScreen();
    }
});

/**MOBILE MENU ANIMATION */
humbergerMenu.addEventListener("click", onMobileMenuEvent);

/**PACKING SECTION ADD AND GO BACKWARD EVENTS */
packingSection.addEventListener("click", e => {
    if (e.target.closest("." + addItemBtn.classList[0])) {
        addItemForm.classList.add("fade-in");
    }

    if (e.target.closest("#" + backArrow.id)) {
        packingSection.classList.add("move-right");
    }

    if (e.target.closest("#remove-item")) {
        const itemID = e.target.parentElement.id;

        tripsList.deletePackingItem(gottenID, itemID);
        const trip = tripsList.getTripByID(gottenID)[0];
        packingItemsScreen(trip.city, trip.packing);
    }
});

/**ADDITEM FORM EXIT THE FORM OR SAVING ITEM TO LIST, EVENTS */
addItemForm.addEventListener("click", e => {
    if (e.target === addItemForm) {
        addItemForm.classList.remove("fade-in");
    }

    if (e.target === addItemToPackingBtn) {
        const item = itemInput.value;
        const itemQnt = itemQntInput.value;
        if (item && itemQnt) {
            tripsList.addPacking(gottenID, {
                id: uuidv4(),
                item,
                itemQnt
            });
            const trip = tripsList.getTripByID(gottenID)[0];
            packingItemsScreen(trip.city, trip.packing);
            itemInput.value = "";
            itemQntInput.value = "";
            addItemForm.classList.remove("fade-in");
        } else {
            alert("all fields are required!");
        }
    }
});

/**LOGOUT, VIEW TRIPS LIST AND VIEW PACKING LIST, EVENTS */
Array.from([mobileMenu, tripTabbar]).forEach(element => {
    element.addEventListener("click", e => {
        if (e.target.closest("." + yourPackingBtn.classList[0])) {
            const id = tripScreen.id;
            if (id) {
                gottenID = id;
                const trip = tripsList.getTripByID(gottenID)[0];
                packingItemsScreen(trip.city, trip.packing);
                packingSection.classList.remove("move-right");
                closeMobileMenu();
            } else {
                alert("select a trip");
            }
        }

        if (e.target.closest("." + yourTripsListBtn.classList[0])) {
            if (innerWidth < 768) {
                tripsListScreen.classList.remove("move-right");
                closeMobileMenu();
            }
        }

        if (e.target === logoutBtn) {
            logout();
            onLogoutEvent();
            closeMobileMenu();
        }
    });
});
