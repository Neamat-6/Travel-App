let projectData = {};

var path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const user_name = process.env.USER_NAME;
const darksky_key = process.env.DARKSKY_KEY;
const pixabay_key = process.env.PIXABAY_KEY;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

app.post("/", (req, res) => {
    const placename = req.body.placename;
    const fullTime = req.body.fullTime;
    const dateOnly = req.body.dateOnly;
    projectData = {
        placename,
        fullTime,
        dateOnly
    };
});

app.get("*", async (req, res) => {
    const place = encodeURIComponent(projectData.placename);
    const fullTime = projectData.fullTime;
    const dateOnly = new Date(projectData.dateOnly).getTime() / 1000;
    const dt = fullTime ? new Date(fullTime) / 1000 : null;
    const geoResponse = await fetch(
        `http://api.geonames.org/postalCodeSearchJSON?placename=${place}&maxRows=10&username=${user_name}`
    );
    try {
        const geoData = await geoResponse.json();
        const index =
            Math.round(Math.random() * geoData.postalCodes.length) ===
                geoData.postalCodes.length
                ? Math.round(Math.random() * geoData.postalCodes.length) - 1
                : Math.round(Math.random() * geoData.postalCodes.length);
        const darkSkyResponse = projectData.fullTime
            ? await fetch(
                `https://api.darksky.net/forecast/${darksky_key}/${geoData.postalCodes[index].lat},${geoData.postalCodes[index].lng},${dt}`
            )
            : await fetch(
                `https://api.darksky.net/forecast/${darksky_key}/${geoData.postalCodes[index].lat},${geoData.postalCodes[index].lng}`
            );
        try {
            const darkSkyData = await darkSkyResponse.json();
            try {
                const pixabayResponse = await fetch(
                    `https://pixabay.com/api/?key=${pixabay_key}&q=${encodeURIComponent(
                        darkSkyData.timezone.split("/")[1].toLowerCase()
                    )}&image_type=photo`
                );
                const pixabayData = await pixabayResponse.json();
                const expectedHit = pixabayData.hits.filter(hit =>
                    hit.tags.includes(
                        darkSkyData.timezone
                            .split("/")[1]
                            .toLowerCase()
                            .replace("_", " ")
                    )
                );
                let hitIndex =
                    Math.round(Math.random() * expectedHit.length) === expectedHit.length
                        ? Math.round(Math.random() * expectedHit.length) - 1
                        : Math.round(Math.random() * expectedHit.length);
                let currentDay;
                if (dateOnly) {
                    currentDay = darkSkyData.daily.data.filter(
                        (obj, i) =>
                            new Date(obj.time * 1000).getDate() ===
                            new Date(dateOnly * 1000).getDate()
                    );
                }
                res.send({
                    imgURL: expectedHit[hitIndex].webformatURL,
                    summary: fullTime
                        ? darkSkyData.currently.summary
                        : currentDay[0].summary,
                    temperature: fullTime
                        ? darkSkyData.currently.temperature
                        : {
                            low: currentDay[0].temperatureLow,
                            high: currentDay[0].temperatureHigh
                        },
                    icon: fullTime ? darkSkyData.currently.icon : currentDay[0].icon
                });
            } catch (error) {
                console.log(`we coudn't fetch data from pixabay with ${error}`);
            }
        } catch (error) {
            console.log(`we coudn't fetch data from darksky with ${error}`);
        }
    } catch (error) {
        console.log(`we coudn't fetch data from geodata with ${error}`);
    }
});

const port = 8000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
