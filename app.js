var express = require('express');
var app = express();

app.use(express.bodyParser());
app.get('/hello', function (req, res) {
    res.send({message: 'Hello World'});
});
app.post('/user/:userID/order', function (req, res) {
    manageOrder(req.params.userID, req.body);
    res.send(204, null);
});

app.listen(3000);
console.log("Server up and listening on port 3000");

function manageOrder(userID, order) {
    console.log('User with ' + userID + ', ordered : ' + JSON.stringify(order));
}


