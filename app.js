var express             = require('express');
var request             = require('request');
var app = express();

var applicationID       = '0607c3f5d047';
var pushAuthorization   = 'Basic dGdnMjAxMzp0Z2cyMDEz';

app.use(express.bodyParser());
app.get('/hello', function (req, res) {
    res.send({message: 'Hello World'});
});
app.get('/allAvailableChannels', function (req, res) {
    getAllAvailableChannels(function (code, channels) {
        res.send(code, channels);
    });
});
app.post('/user/:userID/order', function (req, res) {
    manageOrder(req.params.userID, req.body);
    res.send(204, null);
});
app.post('/sendOffer', function (req, res) {
    sendOffer(req.body, function (code, returnObject) {
        res.send(code, returnObject);
    });
});

app.listen(3000);
console.log("Server up and listening on port 3000");

function manageOrder(userID, order) {
    console.log('User with ' + userID + ', ordered : ' + JSON.stringify(order));
}

function sendOffer(order, callback) {

    var messageBody = {
        sentType : "channels",
        mimeType : "text/plain",
        OSTypes : ["Android"],
        channelNames : ['Kod Ruže'],
        androidData : {},
        notificationMessage : JSON.stringify(order)
    };
    var options = {
        url : 'https://pushapi.infobip.com/3/application/' + applicationID + '/message',
        method : 'POST',
        json : true,
        headers : {Authorization : pushAuthorization},
        body : messageBody
    };
    request(options, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            callback(500, body);
            return;
        }
        callback(200, body);
    });
}


function getAllAvailableChannels(callback) {
    var options = {
        url : 'https://pushapi.infobip.com/1/application/' + applicationID + '/channels',
        method : 'GET',
        json : true,
        headers : {Authorization : pushAuthorization}
    };
    request(options, function (error, response, body) {
        if (error || response.statusCode  !== 200) {
            callback(200, body);
            return;
        }
        callback(500, body);
    });
}
