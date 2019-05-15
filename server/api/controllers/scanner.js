const fs = require('fs');
const hid = require('node-hid');
const db = require('../db/connection');

//Array of current system HID devices
const devices = hid.devices();

let scanner;
let scannedKey;

//Zebra scanner vendor id and product id
const vid = 1504;
const pid = 4608;

//Open a hid device and register event handlers
async function openScanner() {
    try {
        scanner = new hid.HID(vid, pid);
        console.log("Scanner connected.");

        await scanner.on("data", data => {
            scannedKey = data.toString('hex');
            console.log(scannedKey);
        });
        await scanner.on("error", err => {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    } finally {
        scanner.close();
    }
}

//
function checkKey(scannedKey) {
    const queryString = "";
    db.dbQuery(queryString);

}

openScanner();

module.exports = {
    openScanner,
    checkKey
};