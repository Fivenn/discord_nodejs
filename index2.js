var W3CWebSocket = require('websocket').w3cwebsocket;

// Discord Bot Token here
const BOT_TOKEN = "";
// Discord Gateway url
const GATEWAY_URL = "wss://gateway.discord.gg/?v=6&encoding=json";
// Websocket object
let ws = null;


// connect to gateway
ws = new W3CWebSocket(GATEWAY_URL), sequence = 0;
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
        // logins to gateway with the given info
        console.log(b), sequence = b.s, 10 === b.op && (ws.send(JSON.stringify({
            op: 2,
            d: {
                token: BOT_TOKEN,
                properties: {
                    $browser: "browser",
                    $browser: "chrome",
                    $device: "cloud9"
                },
                compress: false
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


// // provided the strings of avatar hash, username, and message, it appends a message element to the chatbox
// function insertMessage(avatar, userid, username, message) {
//     let chatbox = document.getElementById("chatbox"); // whole outer chatbox containing all msgs
    
//     let parent = document.createElement("div"); // a message container. contains avatar, username, and msg
//     parent.classList.add("msg");
    
//     let avatarImg = document.createElement("img"); // create img for avatar
//     avatarImg.classList.add("avatar");
//     avatarImg.src = "https://cdn.discordapp.com/avatars/" + userid + "/" + avatar + ".png";
//     parent.appendChild(avatarImg);
    
//     let usernameDiv = document.createElement("div"); // username text element
//     usernameDiv.classList.add("author");
//     usernameDiv.innerText = username;
//     parent.appendChild(usernameDiv);
    
//     let messageDiv = document.createElement("div"); // message text element
//     messageDiv.classList.add("msg");
//     messageDiv.innerText = message;
//     parent.appendChild(messageDiv);
    
//     chatbox.appendChild(parent); // last but not least, add message container to the chatbox
// }