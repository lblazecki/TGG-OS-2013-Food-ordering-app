var express             = require('express');
var business            = require('./business');
var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/views'));

app.get('/hello', function (req, res) {
    res.send({message: 'Hello World'});
});
app.get('/allAvailableChannels', function (req, res) {
    business.getAllAvailableChannels(function (code, channels) {
        res.send(code, channels);
    });
});
app.post('/user/:userID/order', function (req, res) {
    business.manageOrder(req.params.userID, req.body, function (code, returnObject) {
        res.send(code, returnObject);
    });
});
app.post('/sendOffer', function (req, res) {
    business.sendOffer(req.body, function (code, returnObject) {
        res.send(code, returnObject);
    });
});

app.listen(3000);
console.log("Server up and listening on port 3000");



