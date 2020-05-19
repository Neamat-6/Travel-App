import domItems from "./domItems";
import {
    moveSaveTripScreenToRight,
    onAddTripEvent,
    turnOffScreen
} from "./screensCtrl";

const {
    signInScreen,
    signUpScreen,
    splashScreen,
    saveTripScreen,
    tripScreen,
    tripsListScreen,
    cancelTrip,
    getStarted,
    newUser,
    addTripBtnByClass,
    addTripBtnById
} = domItems;

export default function smallDevicesSetUp() {

    if (tripScreen.style.display === "grid") {
        tripsListScreen.classList.add("move-right");
    }

    /** */
    getStarted.addEventListener("click", () => {
        signInScreen.style.display = "flex";
        splashScreen.classList.add("move-right");
    });

    /** */
    newUser.addEventListener("click", () => {
        signUpScreen.style.display = "flex";
        signInScreen.classList.add("move-right");
    });

    /*** */
    saveTripScreen.addEventListener("click", e => {
        if (e.target === cancelTrip) {
            moveSaveTripScreenToRight();
            tripsListScreen.style.display = "grid";
            tripScreen.style.display = "grid";
        }
    });

    /** */
    tripsListScreen.addEventListener("click", e => {
        if (e.target.closest(`.${addTripBtnByClass.className}`)) {
            onAddTripEvent();
        }
    });

    /** */
    tripScreen.addEventListener("click", e => {
        if (e.target.closest(`#${addTripBtnById.id}`)) {
            saveTripScreen.classList.remove("move-right");
            turnOffScreen(tripScreen);
        }
    });
}
