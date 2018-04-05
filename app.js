var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var https = require("https");
var configs = require('./configs.js');

var apiKey = configs.apiKey;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    next();
});

app.get("/", function(req, res){
    res.send("hi");
});

app.get("/player/:playerName", function(req, res){
    var options = {
        "host": "api.playbattlegrounds.com",
        "path": "/shards/pc-na/players?filter[playerNames]="+req.params.playerName,
        "headers": {
            "Accept": "application/vnd.api+json",
            "Authorization": apiKey
        }
    }
    var request = https.get(options, function(response) {
        var body = "";
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function() {
            console.log(body);
            res.send(body);
        });
    });
});


app.listen(3000,function(){
    console.log("listening on port 3000");
});
