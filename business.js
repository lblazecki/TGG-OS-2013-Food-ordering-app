var request             = require('request');
var config              = require('./config');
var data                = require('./data');

var allOffers = {};
var allOrders = {};

function manageOrder(userID, order, callback) {
    if (!allOrders[order.offerID]) {
        callback(400, 'The offer for this order does not exist');
        return;
    }
    allOrders[order.offerID].push({orderFood : order.orderFood, userID : userID});
    data.saveOrders(allOrders, function () {
        callback(204, null);
        console.log('User with ' + userID + ', ordered : ' + JSON.stringify(order));
    });
}

function sendOffer(offer, callback) {

    var scheduleTime = new Date("2013-10-13 17:30:00").getTime();
    var messageBody = {
        sentType : "channels",
        mimeType : "text/plain",
        OSTypes : ["Android"],
        channelNames : ['Osijek'],
        androidData : {},
        expiryOffset : 6 * 60 * 60,
        scheduleTime : scheduleTime,
        notificationMessage : JSON.stringify(offer)
    };
    var options = {
        url : 'https://pushapi.infobip.com/3/application/' + config.applicationID + '/message',
        method : 'POST',
        json : true,
        headers : {Authorization : config.pushAuthorization},
        body : messageBody
    };
    request(options, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            callback(500, body);
            return;
        }
        offer.id = body.messageID;
        allOrders[offer.id] = [];
        allOffers[offer.id] = offer;
        data.saveOffers(allOffers, function () {
            callback(200, body);
        });
    });
}

function getAllAvailableChannels(callback) {
    var options = {
        url : 'https://pushapi.infobip.com/1/application/' + config.applicationID + '/channels',
        method : 'GET',
        json : true,
        headers : {Authorization : config.pushAuthorization}
    };
    request(options, function (error, response, body) {
        if (error || response.statusCode  !== 200) {
            callback(500, body);
            return;
        }
        callback(200, body);
    });
}

exports.manageOrder                 = manageOrder;
exports.sendOffer                   = sendOffer;
exports.getAllAvailableChannels     = getAllAvailableChannels;
