var mdns = require('mdns'),
	browser  = mdns.createBrowser(mdns.tcp('ipp'));

browser.on('serviceUp', function (rec) {
	console.log(rec.name, 'http://'+rec.host+':'+rec.port+'/'+rec.txtRecord.rp);
});
browser.start();

// Send a QR Code to the label printer
function printLabel(qrCode) {
    return;
}

module.exports = printLabel;