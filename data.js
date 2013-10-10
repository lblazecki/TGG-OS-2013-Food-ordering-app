var fs          = require('fs');
var config      = require('./config');

function saveOffers(allOffers, callback) {
    fs.writeFile(config.offerFileName, JSON.stringify(allOffers), function (error) {
        if (error) {
            console.log("Error on saving offers : " + error);
        }
        callback();
    });
}

function saveOrders(allOrders, callback) {
    fs.writeFile(config.orderFileName, JSON.stringify(allOrders), function (error) {
        if (error) {
            console.log("Error on saving orders : " + error);
        }
        callback();
    });
}

function getSavedOffers(callback) {
    fs.readFile(config.offerFileName, function (error, allOffers) {
        if (error) {
            console.log("Error on reading offers : " + error);
            callback({});
            return;
        }
        callback(JSON.parse(allOffers));
    });
}

function getSavedOrders(callback) {
    fs.readFile(config.orderFileName, function (error, allOrders) {
        if (error) {
            console.log("Error on reading orders : " + error);
            callback({});
            return;
        }
        callback(JSON.parse(allOrders));
    });
}

exports.saveOffers      = saveOffers;
exports.saveOrders      = saveOrders;
exports.getSavedOffers  = getSavedOffers;
exports.getSavedOrders  = getSavedOrders;

