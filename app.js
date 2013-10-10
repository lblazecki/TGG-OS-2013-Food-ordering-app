var express = require('express');
var app = express();
app.get('/hello', function (req, res) {
    res.send({message: 'Hello World'});
});

app.listen(3000);
console.log("Server up and listening on port 3000");

