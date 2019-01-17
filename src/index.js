"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var wss = new WebSocket.Server({ port: 3000, clientTracking: true });
var clients = [];
wss.on('connection', function (ws) {
    clients.push(ws);
    ws.on('message', function (message) {
        console.log("Received: " + message);
        if (message == 'unlock') {
            console.log('Sending door unlock request');
        }
        else {
            console.log('Sending door lock request');
        }
        clients.forEach(function (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
            else {
                var index = clients.indexOf(ws);
                clients.splice(index, 1);
            }
        });
    });
    console.log('Device Connected');
    ws.send('Welcome');
});
