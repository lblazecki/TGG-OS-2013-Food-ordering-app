var request             = require('request');
var config              = require('./config');

function manageOrder(userID, order, callback) {
    console.log('User with ' + userID + ', ordered : ' + JSON.stringify(order));
    callback(204, null);
}

function sendOffer(offer, callback) {

    var scheduleTime = new Date("2013-10-13 17:30:00").getTime();
    var shapedOffer = {
        "foodList" : [
            { "id" : "1", "name" : offer.name, "price" : offer.price}
        ],
        "offerID" : "fwdcd123"
    };
    var messageBody = {
        sentType : "channels",
        mimeType : "text/plain",
        OSTypes : ["Android"],
        channelNames : ['Kod Ruže'],
        androidData : {title : offer.restaurantName},
        expiryOffset : 6 * 60 * 60,
        scheduleTime : scheduleTime,
        notificationMessage : JSON.stringify(shapedOffer)
    };
    var options = {
        url : 'https://pushapi.infobip.com/3/application/' + config.applicationID + '/scheduleMessage',
        method : 'POST',
        json : true,
        headers : {Authorization : config.pushAuthorization},
        body : messageBody
    };
    request(options, function (error, response, body) {
        if (error || response.statusCode !== 200 || !body) {
            callback(500, body);
            return;
        }
        callback(200, body);
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
