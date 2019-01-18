import * as WebSocket from "ws";
import { eventNames } from "cluster";

const wss = new WebSocket.Server({ port: parseInt(process.env.PORT), clientTracking: true }, () => {
  console.log("Server running on port: ", process.env.PORT);
});

const clients = [];
wss.on("connection", ws => {
  clients.push(ws);
  ws.on("message", (message: string) => {
    console.log(`Received: ${message}`);
    if (message == "unlock") {
      console.log("Sending door unlock request");
    }
    else if (message == "ping") {
        ws.send('pong');
    } else {
      console.log("Sending door lock request");
    }
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      } else {
        const index = clients.indexOf(ws);
        clients.splice(index, 1);
      }
    });
  });
  console.log("Device Connected");
  ws.send("Welcome");
});
