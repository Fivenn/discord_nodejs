var W3CWebSocket = require('websocket').w3cwebsocket;

var token = "NTg4MzQzODQ2OTcxMTEzNDky.XQjF5A.WM3z7lrV6iacw7OWVUGyFb5-mZY";
var ws = new W3CWebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
  
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
                  "afk": true
             }
         }
         var bigPayload = {"op": 2, "d": payload};
           ws.send(JSON.stringify(bigPayload));
     } else if (data.op == 0 && data.t == "READY") {
         console.log(data);
     }
}
