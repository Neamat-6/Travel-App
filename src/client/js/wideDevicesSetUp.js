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
    addTripBtnByClass,
    newUser
} = domItems;

export default function wideDevicesSetUp() {
    /** */
    tripsListScreen.classList.remove("move-right");
    if (tripScreen.style.display === "grid") {
        tripsListScreen.style.display = "grid";
        turnOffScreen([splashScreen, signInScreen]);
    }

    if (tripsListScreen.style.display === "grid") {
        tripScreen.style.display = "grid";
    }

    newUser.addEventListener("click", () => {
        signUpScreen.style.display = "flex";
        signInScreen.classList.add("move-right");
        splashScreen.classList.add("move-right");
        turnOffScreen([signInScreen, splashScreen]);
    });

    /*** */
    saveTripScreen.addEventListener("click", e => {
        if (e.target === domItems.cancelTrip) {
            tripsListScreen.style.display = "grid";
            tripsListScreen.classList.remove('move-right')
            tripScreen.style.display = "grid";
            moveSaveTripScreenToRight();
        }
    });

    /** */
    tripsListScreen.addEventListener("click", e => {
        if (e.target.closest(`.${addTripBtnByClass.className}`)) {
            onAddTripEvent();
        }
    });
}
