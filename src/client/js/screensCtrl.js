import domItems from "./domItems";
import { greetingUser } from "./createDom";
import { login } from "./utils";

const {
    signInScreen,
    signUpScreen,
    splashScreen,
    welcomeScreen,
    saveTripScreen,
    tripScreen,
    tripsListScreen,
    tripCityInput,
    tripCountryInput,
    tripDateInput,
    tripTimeInput,
    humbergerMenu,
    mobileMenu,
    nameInput,
    passwordInput
} = domItems;

export const turnOffScreen = elements => {
    if (elements.length) {
        setTimeout(() => {
            elements.forEach(e => {
                e.style.display = "none";
            });
        }, 500);
    } else {
        setTimeout(() => {
            elements.style.display = "none";
        }, 500);
    }
};

export const registrationScreen = () => {
        welcomeScreen.style.display = "flex";
        setTimeout(() => {
            signUpScreen.classList.add("move-right");
        }, 100);
        setTimeout(() => {
            welcomeScreen.classList.add("fade-out");
        }, 3000);
        setTimeout(() => {
            turnOffScreen(welcomeScreen);
        }, 3500);
        turnOffScreen([signUpScreen, splashScreen]);
        saveTripScreen.style.display = "flex";
        saveTripScreen.classList.remove("move-right");
        greetingUser();
};

export const moveSaveTripScreenToRight = () => {
    setTimeout(() => {
        saveTripScreen.classList.add("move-right");
    }, 500);
};

export const onAddTripEvent = () => {
    saveTripScreen.classList.remove("move-right");
    turnOffScreen([tripScreen, tripsListScreen]);
};

export const onSavingATrip = (currentTime, currentDate) => {
    tripScreen.style.display = "grid";
    tripsListScreen.style.display = "flex";
    setTimeout(() => {
        saveTripScreen.classList.add("move-right");
    }, 500);
    tripCityInput.value = "";
    tripCountryInput.value = "";
    tripTimeInput.value = currentTime;
    tripDateInput.value = currentDate;
};

export const onLoginEvent = () => {
    signInScreen.style.display = "none";
    splashScreen.style.display = "none";
    tripScreen.style.display = "grid";
    tripsListScreen.style.display = "flex";
    saveTripScreen.style.display = "flex";
};

export const onLogoutEvent = () => {
    signInScreen.style.display = "flex";
    if (innerWidth >= 768) {
        splashScreen.style.display = "flex";
    } else {
        splashScreen.style.display = "grid";
    }

    signInScreen.classList.remove("move-right");
    splashScreen.classList.remove("move-right");
    tripsListScreen.style.display = "none";
    tripScreen.style.display = "none";
};

export const onMobileMenuEvent = () => {
    humbergerMenu.classList.toggle('toggle-burger')
    mobileMenu.classList.toggle('toggle-mobile-menu')
}

export const closeMobileMenu = () => {
    humbergerMenu.classList.remove('toggle-burger')
    mobileMenu.classList.remove('toggle-mobile-menu')

}

export  const loginScreen = (userName, userPassword) => {
    if (login(userName, userPassword)) {
        setTimeout(() => {
            signInScreen.classList.add("move-right");
            splashScreen.classList.add("move-right");
        }, 100);

        saveTripScreen.style.display = "flex";
        saveTripScreen.classList.add("move-right");
        if (innerWidth >= 768) {
            tripsListScreen.style.display = "flex";
            tripScreen.style.display = "flex";
        } else {
            tripsListScreen.style.display = "grid";
            tripScreen.style.display = "grid";
        }
        nameInput.value = "";
        passwordInput.value = "";
    }
}