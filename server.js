var express = require('express');
var http = require('http');
var url = require('url');
var returnDateStr = NaN;
var returnDateMS = NaN;


var app = express()

function isDate(val) {
    // attempts to create a Date object using val
    // returns true if successful, otherwise returns false
    var d = new Date(val);
    return !isNaN(d.valueOf());
}

function uniformDateStr(inDate) {
    // returns a formatted date string of the format 'Augost 1, 2010'
    // inDate must be a Date object
    var months = ['January', 'February', 'March', 'April',  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[inDate.getMonth()] + ' ' + inDate.getDate() + ', ' + inDate.getFullYear()
}
app.use(express.static(__dirname));

app.get('/*', function (req, res) {
    var datePath = url.parse(req.url).pathname.substr(1).replace(/%20/g, " ")

    if (datePath.length == 0) {
        console.log('home')
        return;
    }
    if ((Number.isInteger(parseInt(datePath))) && !(datePath.includes('/'))) {
        var workDate = new Date(parseInt(datePath))
        returnDateMS = parseInt(datePath);
        returnDateStr = uniformDateStr(workDate);
    }
    else if (isDate(datePath)) {
        returnDateMS = Date.parse(datePath);
        returnDateStr = uniformDateStr(new Date(returnDateMS))
    }

    var returnObj = { unix: returnDateMS, natural: returnDateStr};
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(returnObj));
})


//app.listen(8080, function () {
app.listen(3000, function () {
  console.log('Example app listening on port 8080!')
})