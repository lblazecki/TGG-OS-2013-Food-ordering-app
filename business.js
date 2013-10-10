var request             = require('request');
var config              = require('./config');

function manageOrder(userID, order) {
    console.log('User with ' + userID + ', ordered : ' + JSON.stringify(order));
}

function sendOrder(order, callback) {

    var scheduleTime = new Date("2013-10-13 17:30:00").getTime();
    var messageBody = {
        sentType : "channels",
        mimeType : "text/plain",
        OSTypes : ["Android"],
        channelNames : ['Osijek'],
        androidData : {},
        expiryOffset : 6 * 60 * 60,
        scheduleTime : scheduleTime,
        notificationMessage : JSON.stringify(order)
    };
    var options = {
        url : 'https://pushapi.infobip.com/3/application/' + config.applicationID + '/scheduleMessage',
        method : 'POST',
        json : true,
        headers : {Authorization : config.pushAuthorization},
        body : messageBody
    };
    request(options, function (error, response, body) {
        if (error || response.statusCode  !== 200) {
            callback(200, body);
            return;
        }
        callback(500, body);
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
            callback(200, body);
            return;
        }
        callback(500, body);
    });
}

exports.manageOrder                 = manageOrder;
exports.sendOrder                   = sendOrder;
exports.getAllAvailableChannels     = getAllAvailableChannels;
