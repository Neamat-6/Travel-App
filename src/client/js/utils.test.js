import {
    registrationNewUser,
    login,
    logout,
    counter,
    getData,
    postData
} from "./utils";

const request = require("supertest"),
    app = require("../../server/index");

test("It should response the GET method", async () => {
    await request(app);
    const location = "Paris France";
    const dateOnly = new Date(Date.now()).getTime();
    postData("http://localhost:8000/", {
        placename: location,
        fullTime: false,
        dateOnly
    });
    return getData("http://localhost:8000/*").then(res => {
        expect(res).toBeDefined();
    });
});

test("should be able to login a registered user", () => {
    registrationNewUser("123greenland", "123greenland", "ramzi");
    login("ramzi", "123greenland");
    const user = JSON.parse(localStorage.getItem("user"));
    expect(user.name).toBe("ramzi");
    expect(user.password).toBe("123greenland");
    expect(user.logged).toBe(true);
});

test("should be able to logout a logged user", () => {
    logout(false);
    const user = JSON.parse(localStorage.getItem("user"));
    expect(user.logged).toBe(false);
});

describe("test the left time grammar", () => {
    test("should be minute", () => {
        const time = Date.now() + 60000;
        const stringTime = counter(time);
        expect(stringTime).toBe("1 minute");
    });

    test("should be minutes", () => {
        const time = Date.now() + 60000 * 4;
        const stringTime = counter(time);
        expect(stringTime).toBe("4 minutes");
    });

    test("should be hour", () => {
        const time = Date.now() + 3600000;
        const stringTime = counter(time);
        expect(stringTime).toBe("1 hour");
    });

    test("should be hours", () => {
        const time = Date.now() + 3600000 * 4;
        const stringTime = counter(time);
        expect(stringTime).toBe("4 hours");
    });

    test("should be day", () => {
        const time = Date.now() + 24 * 3600000;
        const stringTime = counter(time);
        expect(stringTime).toBe("1 day");
    });

    test("should be days", () => {
        const time = Date.now() + 24 * 3600000 * 4;
        const stringTime = counter(time);
        expect(stringTime).toBe("4 days");
    });
});
