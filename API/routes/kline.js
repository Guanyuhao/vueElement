var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/v1/depth',function(req,res){
    var params = req.query
    var market = params.market
    var size = params.size
    var timestamp = params.timestamp || 1515647351705 
    request('http://api.zb.com/data/v1/depth?market='+market+'&size='+size+'&timestamp='+timestamp, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body)
        
    });
})

router.get('/v1/kline',function(req,res){
    var params = req.query
    var market = params.market
    var size = params.size
    var timestamp = params.timestamp || 1515647351705 
    request('http://api.zb.com/data/v1/kline?market='+market+'&size='+size+'&timestamp='+timestamp, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body)
        
    });
})

module.exports = router