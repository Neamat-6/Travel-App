import { User } from "./User";
import { toggleLog } from "./User";
import "whatwg-fetch";
import "babel-polyfill";

export const getData = async url => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        alert(`try again! 
        we coudn't reach the server to get the data with: 
        ${error} `);
    }
};

export const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    response
        .json()
        .then(data => {
            return data;
        })
        .catch(err => {
            alert(`try again! 
            we coudn't reach the server to send the request with: 
            ${error} `);
        });
};

export const registrationNewUser = (password, confirmedPassword, name) => {
    if(password && confirmedPassword && name){
        if (password === confirmedPassword) {
            localStorage.clear();
            const user = new User(name.toLowerCase(), password);
            user.storeUser(user);
            return true;
        } else {
            alert("passwords do not match!");
            return false;
        }

    }else{
        alert('all fields are required')
    }
};

export const login = (userName, userPassword) => {
    if (userName && userPassword) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (
            storedUser &&
            storedUser.name === userName.toLowerCase() &&
            storedUser.password === userPassword
        ) {
            toggleLog(true);
            return true;
        } else {
            alert("wrong user name or password, or user does not exist");
            return false;
        }
    } else {
        alert("please fill all the fields!");
    }
};

export const logout = () => {
    toggleLog(false);
};

export const getCurrentDate = () => {
    const year = new Date(Date.now()).getFullYear();
    const month =
        parseInt(new Date(Date.now()).getMonth() + 1) < 10
            ? "0" + parseInt(new Date(Date.now()).getMonth() + 1)
            : parseInt(new Date(Date.now()).getMonth() + 1);
    const day =
        new Date(Date.now()).getDate() < 10
            ? "0" + new Date(Date.now()).getDate()
            : new Date(Date.now()).getDate();
    return `${year}-${month}-${day}`;
};

export const getCurrentTime = () => {
    const hours =
        new Date(Date.now()).getHours() < 10
            ? "0" + new Date(Date.now()).getHours()
            : new Date(Date.now()).getHours();
    const minutes =
        new Date(Date.now()).getMinutes() < 10
            ? "0" + new Date(Date.now()).getMinutes()
            : new Date(Date.now()).getMinutes();
    return `${hours}:${minutes}`;
};

/**function that help to return how much time is left before the departing */
export const counter = flightTime => {
    const leftTimeInSeconds = (flightTime - Date.now()) / 1000;

    return `${
        Math.round(leftTimeInSeconds / 86400)
            ? `${
            Math.round(leftTimeInSeconds / 86400) > 1
                ? `${Math.round(leftTimeInSeconds / 86400)} days`
                : `${Math.round(leftTimeInSeconds / 86400)} day`
            }`
            : `${
            Math.round(leftTimeInSeconds / 3600)
                ? `${
                Math.round(leftTimeInSeconds / 3600) > 1
                    ? `${Math.round(leftTimeInSeconds / 3600)} hours`
                    : `${Math.round(leftTimeInSeconds / 3600)} hour`
                }`
                : `${
                Math.round(leftTimeInSeconds / 60)
                    ? `${
                    Math.round(leftTimeInSeconds / 60) > 1
                        ? `${Math.round(leftTimeInSeconds / 60)} minutes`
                        : `${Math.round(leftTimeInSeconds / 60)} minute`
                    }`
                    : ""
                }`
            }`
        }`;
};

/**transform F to C degree */
export const toCelsius = fTemp => {
    return Math.round((fTemp - 32) * (5 / 9));
};


