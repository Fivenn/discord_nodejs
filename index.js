var W3CWebSocket = require('websocket').w3cwebsocket;
var token="NTg4MzQzODQ2OTcxMTEzNDky.XQFILg.JBroGPXz-uKohK4Y6NncOG_wfd8",

ws = new W3CWebSocket("wss://gateway.discord.gg/?encoding=json&v=6"), sequence = 0;
ws.onopen = function() {
    return console.log("OPEN!")
}, ws.onerror = function(a) {
    console.error(a), process.exit(1)
}, ws.onclose = function(a) {
    console.error(a), process.exit(1)
}, ws.onmessage = function(a) {
    try {
        var b = JSON.parse(a.data);
        if (0 === b.op) return;
        console.log(b), sequence = b.s, 10 === b.op && (ws.send(JSON.stringify({
            op: 2,
            d: {
                token: token,
                properties: {
                    $browser: "firefox"
                },
                large_threshold: 50
            }
        })), setInterval(function() {
            ws.send(JSON.stringify({
                op: 1,
                d: sequence
            }))
        }, b.d.heartbeat_interval))
    } catch (a) {
        console.error(a)
    }
};
