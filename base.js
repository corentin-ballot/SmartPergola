//Define requires
//import * as control from ("regulation");
const express = require('express');
const serialport = require('serialport');
const fs = require('fs');
const vm = require('vm');
var http = require('http');
vm.runInThisContext(fs.readFileSync(__dirname + "/regulation.js"))
//Store Arduino data
var myData = 0;

//Setup and start web server on :3003
const app = express();

app.get('/', function (req, res) { 
	res.send('Pergolas - Valeur : ' + myData);
});

app.listen(3003, function () { 
	console.log('Example app listening on port 3003!'); 
});

//Setup and start serial port reading
const Readline = serialport.parsers.Readline;
const parser = new Readline();

var mySerialPort = new serialport("/dev/cu.usbmodem1421", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});




mySerialPort.pipe(parser);
parser.on('data', function(input) {
  //var d=new Date();
  //var temps = d.getTime();
          myData = JSON.parse(input);

//console.log(myData.id+" id mesure "+myData.mesure);
//const ev = new control();
var ev= new eventLoad(myData.id,myData.mesure);
//console.log(ev);
});


//app.use(express.static(__dirname + '/'));
app.get('/index.html', function (req, res) { 
	fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

app.get('/draw.js', function (req, res) { 
	fs.readFile('./draw.js', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

app.get('/style.css', function (req, res) { 
	fs.readFile('./style.css', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(content);
    });
});

app.get('/babylon.custom.js', function (req, res) { 
	fs.readFile('./babylon.custom.js', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

app.get('/nav.js', function (req, res) { 
	fs.readFile('./nav.js', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

/***************************/
/*        WEBSOCKET        */
/***************************/

// Chargement de socket.io
var server = http.createServer(app).listen(3004);
var io = require('socket.io').listen(server);  //pass a http.Server instance

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('message', 'clim_on');
});