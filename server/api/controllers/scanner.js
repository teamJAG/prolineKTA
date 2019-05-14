const fs = require('fs');
const hid = require('node-hid');
const devices = hid.devices();


const scanner = devices.forEach(device => {
    if (device.vendorId === 1504 && device.productId === 4608) {
        return new hid.HID(device.path);
    } else {
        throw "Scanner not connected.";
    }
});

async function readCode() {
    await scanner.
}

function checkKey(scannedKey) {
    return;
}

module.exports = checkKey;