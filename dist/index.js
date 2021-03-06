"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT, clientTracking: true }, () => {
    console.log(`Server running on port ${PORT}`);
});
const clients = [];
wss.on("connection", ws => {
    clients.push(ws);
    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        if (message == "unlock") {
            console.log("Sending door unlock request");
        }
        else if (message == "ping") {
            ws.send('pong');
        }
        else {
            console.log("Sending door lock request");
        }
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
            else {
                const index = clients.indexOf(ws);
                clients.splice(index, 1);
            }
        });
    });
    console.log("Device Connected");
    ws.send("Welcome");
});
