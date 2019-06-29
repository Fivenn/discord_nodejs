var W3CWebSocket = require('websocket').w3cwebsocket;
var https = require('https');

var token = "NTg4MzQzODQ2OTcxMTEzNDky.XQjF5A.WM3z7lrV6iacw7OWVUGyFb5-mZY";
var ws = new W3CWebSocket("wss://gateway.discord.gg/?v=6&encoding=json");

//Mise en place lors de la connection a la gateway
ws.onopen = function() {
    return console.log("OPEN!")
}, ws.onerror = function(a) {
    console.error(a), process.exit(1)
}, ws.onclose = function(a) {
    console.error(a), process.exit(1)
}, ws.onmessage = function (a) {
    var msg = a.data;
    var data = JSON.parse(msg);
    if (data.op == 10) {
        console.log(data);
        var payload = {
             "token": token,
             "properties": {
                "$os": "browser",
                "$browser": "chrome",
                   "$device": "device"
             },
            "compress": false,
            "large_threshold": 250,
            "presence": {
                  "status": "online",
                  "since": 91879201,
                  "afk": false
             }
         }
         var bigPayload = {"op": 2, "d": payload};
           ws.send(JSON.stringify(bigPayload));
     } else if (data.op == 0 && data.t == "READY") {
         console.log(data);
     } else if(data.op == 0 && data.d.content == "-keanu"){
        const content = JSON.stringify({
            content: "You're breathtaking!"
         });

         //Envoi d'un message
         let req = https.request({
            method: 'POST',
            headers: {
               "Content-Type": 'application/json',
               "Authorization": 'Bot ' + token
            },
            hostname: "discordapp.com",
            path: `/api/v6/channels/588438839018913798/messages`
         }, (res) => {
            console.log(res);
         });

         req.on('error', (error) => {
            console.log(error);
         });

         req.write(content);
         req.end();
    }
}