var express             = require('express');
var business            = require('./business');
var app = express();



app.use(express.bodyParser());
app.get('/hello', function (req, res) {
    res.send({message: 'Hello World'});
});
app.get('/user/:userID/allAvailableChannels', function (req, res) {
    business.getAllAvailableChannels(function (code, channels) {
        res.send(code, channels);
    });
});
app.post('/user/:userID/order', function (req, res) {
    business.manageOrder(req.params.userID, req.body);
    res.send(204, null);
});
app.post('/sendOrder', function (req, res) {
    business.sendOrder(req.body, function (code, returnObject) {
        res.send(code, returnObject);
    });
});

app.listen(3000);
console.log("Server up and listening on port 3000");


