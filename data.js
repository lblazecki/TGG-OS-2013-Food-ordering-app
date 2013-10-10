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


exports.saveOffers      = saveOffers;
exports.saveOrders      = saveOrders;

