const nodeWebCam = require('node-webcam');
const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.static('images'));
const options = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 1,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location"
};

const webcam = nodeWebCam.create(options);

const captureShot = () => {
    return new Promise(resolve => {
        const path = `./images/`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        const secondsSinceEpoch = Math.round(Date.now() / 1000)

        webcam.capture(`./images/${secondsSinceEpoch}.${options.output}`, (err, data) => {
            if (err) {
                console.log(err);
                rejects(err);
            }
            console.log(`Image created ${secondsSinceEpoch}.${options.output}`);
            resolve(`/${secondsSinceEpoch}.${options.output}`);
        });
    });
};

app.get('/', (req, res) => {
    captureShot()
        .then((response) => {
            res.send(`<img src="${response}"/>`)
        });
});

app.listen(3000, () => {
    console.log("Listening at port 3000....");
});

let minutes = 1;
const the_interval = minutes * 60 * 1000;
setInterval(function () {
    console.log("I am doing my 1 minute check");
    captureShot()
        .then((response) => {
            console.log(`capture done ${response}`);
        });
}, the_interval);