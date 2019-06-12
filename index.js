
{"t":null,
"s":null,
"op":10,
"d":{
    "heartbeat_interval":41250,
    "_trace":["[\"gateway-prd-main-5kmd\",
    {\"micros\":0.0}]"]

{"t":"READY",
"s":1,
"op":0,
"d":{
    "v":6,
    "user_settings":{},
    "user":{
        "verified":true,
        "username":"IMR1_bot_discord",
        "mfa_enabled":false,
        "id":"588343846971113492",
        "email":null,
        "discriminator":"9004",
        "bot":true,
        "avatar":null},
    "session_id":"684c950b8dcc8fb7e72d713b786d675a",
    "relationships":[],
    "private_channels":[],
    "presences":[],
    "guilds":[],
    "_trace":["[\"gateway-prd-main-5kmd\",
    {\"micros\":102334,
    \"calls\":[\"discord-sessions-prd-1-29\",
    {\"micros\":101620,
    \"calls\":[\"start_session\",
    {\"micros\":99639,\"calls\":[]},
    \"guilds_connect\",
    {\"micros\":2,\"calls\":[]},\"presence_connect\",{\"micros\":1598,\"calls\":[]}]}]}]"]}}

const W3CWebSocket = require("websocket").w3cwebsocket;

(function () {
    // Discord Bot Token here
    const BOT_TOKEN = "";
    
    // Discord Gateway url
    const GATEWAY_URL = "wss://gateway.discord.gg/?v=6&encoding=json";
    
    // Websocket object
    let ws = null;
    
    // when page loads, connect to gateway
    window.onload = function () {
        connect();
    };
    
    // connect to gateway
    function connect() {
        
    }
    
    // called with websocket onmessage event
    function messageHandler(message) {
        
    }
    
    // logins to gateway with the given info
    function doLogin() {
        let msg = { // required parameters in order to identify as the bot user
            "token": BOT_TOKEN,
            "properties": {
                "$os": "browser",
                "$browser": "chrome",
                "$device": "cloud9"
            },
            "compress": false
        };
        
    }
    
    // provided the strings of avatar hash, username, and message, it appends a message element to the chatbox
    function insertMessage(avatar, userid, username, message) {
        let chatbox = document.getElementById("chatbox"); // whole outer chatbox containing all msgs
        
        let parent = document.createElement("div"); // a message container. contains avatar, username, and msg
        parent.classList.add("msg");
        
        let avatarImg = document.createElement("img"); // create img for avatar
        avatarImg.classList.add("avatar");
        avatarImg.src = "https://cdn.discordapp.com/avatars/" + userid + "/" + avatar + ".png";
        parent.appendChild(avatarImg);
        
        let usernameDiv = document.createElement("div"); // username text element
        usernameDiv.classList.add("author");
        usernameDiv.innerText = username;
        parent.appendChild(usernameDiv);
        
        let messageDiv = document.createElement("div"); // message text element
        messageDiv.classList.add("msg");
        messageDiv.innerText = message;
        parent.appendChild(messageDiv);
        
        chatbox.appendChild(parent); // last but not least, add message container to the chatbox
    }
})();
